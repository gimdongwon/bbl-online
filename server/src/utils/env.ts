import dotenv from 'dotenv';

dotenv.config(); // 프로젝트 루트에 맞게 경로 조정

console.log('Environment variables loaded:');
console.log('SMTP_USER:', process.env.SMTP_USER ? 'LOADED' : 'NOT SET');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'LOADED' : 'NOT SET');
