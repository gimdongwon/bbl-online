import { Request, Response } from 'express';
import BBL from '../models/BBL';
import User from '../models/User';
import { sendEmail } from '../utils/email';

export const issueBBL = async (req: Request, res: Response): Promise<void> => {
  const {
    recipientName,
    recipientTeam,
    recipientId,
    issuerId,
    purpose,
    amount,
  } = req.body;

  try {
    // 가장 마지막으로 발행된 동일 금액의 BBL의 bblNo를 가져옴
    const lastBBL = await BBL.findOne({ amount }) // 같은 금액만 검색
      .sort({ bblNo: -1 }) // bblNo 역순 정렬
      .exec();

    // 새로운 bblNo 계산
    const lastBBLNo = lastBBL ? parseInt(lastBBL.bblNo) : amount * 1000000; // 없으면 초기값
    const newBBLNo = (lastBBLNo + 1).toString();

    const newBBL = new BBL({
      recipientName,
      recipientTeam,
      recipientId,
      purpose,
      issuerId,
      amount,
      bblNo: newBBLNo,
      issueDate: new Date(),
    });

    const savedBBL = await newBBL.save();

    // 이메일 알림 발송
    const issuer = await User.findOne({ companyNo: issuerId });
    if (!issuer) {
      throw new Error('사용자의 이메일이 없어 이메일 보내기에 실패하였습니다.');
    }

    const emailSubject = `BBL Issued: ${newBBLNo}`;
    const emailText = `Hi ${recipientName},\n\nYou have received a BBL.\n\nDetails:\n- Issuer: ${issuerId}\n- Purpose: ${purpose}\n- Amount: ${amount}\n\nThank you.`;
    const emailHtml = `
      <h1>BBL Issued</h1>
      <p><strong>Hi ${recipientName},</strong></p>
      <p>You have received a BBL.</p>
      <ul>
        <li><strong>Issuer:</strong> ${issuerId}</li>
        <li><strong>Purpose:</strong> ${purpose}</li>
        <li><strong>Amount:</strong> ${amount}</li>
      </ul>
      <p>Thank you.</p>
    `;

    await sendEmail(issuer.email, emailSubject, emailText, emailHtml);

    res.status(201).json({
      message: 'BBL issued successfully and email sent',
      bbl: savedBBL,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === 'MongoServerError' &&
      (error as any).code === 11000
    ) {
      res.status(400).json({ error: 'BBL No already exists' }); // 중복 에러 처리
    } else {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

// 모든 BBL 리스트 반환
export const getAllBBLs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bblList = await BBL.find(); // 모든 BBL 데이터 조회
    // issuerId로 사용자 이름을 조회하여 추가
    const bbls = await Promise.all(
      bblList.map(async (bbl) => {
        const issuer = await User.findOne({ companyNo: bbl.issuerId }); // issuerId로 사용자 찾기

        return {
          ...bbl.toObject(), // 기존 BBL 데이터를 유지
          issuerName: issuer?.name || 'Unknown', // 사용자 이름 추가 (없으면 'Unknown')
        };
      })
    );
    res.status(200).json({ bbls });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching BBLs' });
  }
};

// 추후 페이징 기능 추가
// export const getAllBBLs = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // 쿼리 파라미터로 page와 limit을 받아옵니다.
//     const page = parseInt(req.query.page as string, 10) || 1;
//     const limit = parseInt(req.query.limit as string, 10) || 10;
//     const skip = (page - 1) * limit;

//     // 전체 항목 수 계산
//     const totalItems = await BBL.countDocuments();

//     // 현재 페이지 데이터 가져오기
//     const bbls = await BBL.find().skip(skip).limit(limit);

//     res.status(200).json({
//       data: bbls,
//       pagination: {
//         totalItems,
//         totalPages: Math.ceil(totalItems / limit),
//         currentPage: page,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching BBLs' });
//   }
// };
