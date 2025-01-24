import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: `"BBL Service" <${process.env.SMTP_USER}>`, // Gmail 계정을 반드시 사용해야 함
      to, // 수신자 이메일
      subject, // 이메일 제목
      text, // 텍스트 내용
      html, // HTML 내용
    });

    console.log('Email sent successfully:', info.messageId); // 성공 로그
  } catch (error) {
    console.error('Error sending email:', error); // 에러 로그
    throw new Error('Failed to send email');
  }
};
