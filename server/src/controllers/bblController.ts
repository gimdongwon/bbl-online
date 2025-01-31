import { Request, Response } from 'express';
import BBL from '../models/BBL';
import { sendEmail } from '../utils/email';

export const issueBBL = async (req: Request, res: Response): Promise<void> => {
  const {
    issuer,
    recipientName,
    recipientTeam,
    purpose,
    bblNo,
    issueDate,
    employeeId,
    amount,
  } = req.body;

  try {
    const newBBL = new BBL({
      issuer,
      recipientName,
      recipientTeam,
      purpose,
      bblNo,
      issueDate: new Date(issueDate),
      employeeId,
      amount,
    });

    const savedBBL = await newBBL.save();

    // 이메일 알림 발송
    const emailSubject = `BBL Issued: ${bblNo}`;
    const emailText = `Hi ${recipientName},\n\nYou have received a BBL.\n\nDetails:\n- Issuer: ${issuer}\n- Purpose: ${purpose}\n- Amount: ${amount}\n\nThank you.`;
    const emailHtml = `
      <h1>BBL Issued</h1>
      <p><strong>Hi ${recipientName},</strong></p>
      <p>You have received a BBL.</p>
      <ul>
        <li><strong>Issuer:</strong> ${issuer}</li>
        <li><strong>Purpose:</strong> ${purpose}</li>
        <li><strong>Amount:</strong> ${amount}</li>
      </ul>
      <p>Thank you.</p>
    `;

    await sendEmail('dongwon@likelion.org', emailSubject, emailText, emailHtml);

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
    const bbls = await BBL.find(); // 모든 BBL 데이터 조회
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
