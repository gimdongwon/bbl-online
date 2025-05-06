import './utils/env'; // 환경 변수 초기화
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

const app = express();

// Middleware

// CORS 설정 (항상 맨 위에 위치시킵니다!)
app.use(
  cors({
    origin: [
      'http://localhost:5002',
      'http://localhost:3000',
      'http://localhost',
      'http://111.118.40.51:5002',
      'http://192.168.0.18:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  })
);
app.use(express.json());

// MongoDB 연결
connectDB();

export default app;
