import './utils/env'; // 환경 변수 초기화

import express from 'express';
import connectDB from './config/db';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB 연결
connectDB();

// JSON 요청 처리
app.use(express.json());

// 라우트 등록
app.use('/api', routes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('BBL-Online API is running!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
