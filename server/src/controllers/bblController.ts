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
    category,
  } = req.body;

  try {
    // 가장 마지막으로 발행된 동일 금액의 BBL의 bblNo를 가져옴
    const lastBBL = await BBL.findOne({ amount }) // 같은 금액만 검색
      .sort({ bblNo: -1 }) // bblNo 역순 정렬
      .exec();

    // 새로운 bblNo 계산
    const lastBBLNo = lastBBL ? parseInt(lastBBL.bblNo) : amount * 1000000; // 없으면 초기값
    const newBBLNo = (lastBBLNo + 1).toString();
    const issueDate = new Date();

    const newBBL = new BBL({
      recipientName,
      recipientTeam,
      recipientId,
      purpose,
      issuerId,
      amount,
      bblNo: newBBLNo,
      issueDate,
      category,
    });

    const savedBBL = await newBBL.save();

    // 이메일 알림 발송
    const issuer = await User.findOne({ companyNo: issuerId });
    if (!issuer) {
      throw new Error('사용자의 이메일이 없어 이메일 보내기에 실패하였습니다.');
    }

    const emailSubject = `${issuer.name} 님으로부터 ${amount} BBL이 도착했어요! 💌`;

    const emailHtml = `
      안녕하세요, ${recipientName}님!<br/><br/>
      수령인 : ${recipientName}<br/>
      목적 : ${category}<br/>
      목적 상세 : ${purpose}<br/>
      발행인 : ${issuer.name}<br/>
      발행일 : ${issueDate.toLocaleString()}<br/><br/>
      ${recipientName}님의 멋진 활약에 감사의 마음을 전합니다 🙂👍
      <br/><br/>
      ps: BBL은 1일~말일 발행건에 대해 익월 10일 경 자금일에 경비계좌로 입금됩니다.(평균 6~9시pm 사이)
    `;

    await sendEmail(issuer.email, emailSubject, emailHtml);

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

interface AuthenticatedRequest extends Request {
  user?: string;
}
// 모든 BBL 리스트 반환
export const getBBLList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // 로그인 권한 없을시 return;
    const userId = req.user as string | undefined;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized..' });
      return;
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // admin 권한을 가진 사용자 리스트
    const adminUserList: string[] = ['10685', '10933', '11008'];
    const isAdmin: boolean = adminUserList.includes(user.companyNo);
    const query: any = isAdmin ? {} : { issuerId: user.companyNo };

    const { startDate, endDate, page = '1' } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      start.setHours(0, 0, 0, 0); // 시작 날짜 00:00:00

      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999); // 종료 날짜 23:59:59.999

      query.issueDate = {
        $gte: start,
        $lte: end,
      };
    }

    const totalCount = await BBL.countDocuments(query);
    const bblList = await BBL.find(query)
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(pageSize); // 본인이 발행한 BBL 데이터 조회

    // issuerId로 사용자 이름을 조회하여 추가 (res에 추가하기 name 추가하기 위한 로직)
    const bbls = await Promise.all(
      bblList.map(async (bbl) => {
        let issuerName = 'Unknown';
        if (bbl.issuerId === user.companyNo) {
          issuerName = user.name;
        } else {
          const issuer = await User.findOne({ companyNo: bbl.issuerId });
          issuerName = issuer?.name || 'Unknown';
        }
        return {
          ...bbl.toObject(), // 기존 BBL 데이터를 유지
          issuerName,
        };
      })
    );
    res
      .status(200)
      .json({ bbls, totalCount, currentPage: pageNumber, pageSize });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching BBLs' });
  }
};
