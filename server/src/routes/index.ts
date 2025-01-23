import { Router } from 'express';
// import authRoutes from './auth';
import fs from 'fs';
import path from 'path';

const router = Router();

// // 라우트 등록
// router.use('/auth', authRoutes);

// 현재 디렉토리의 모든 파일을 읽어서 자동으로 라우트 등록
fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.ts' || !file.endsWith('.ts')) return; // index.ts 제외
  const route = require(path.join(__dirname, file));
  router.use(`/${file.split('.')[0]}`, route.default);
});

export default router;
