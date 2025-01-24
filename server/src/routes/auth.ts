import express from 'express';
import {
  register,
  login,
  getUsers,
  getCurrentUser,
} from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// 사용자 등록
router.post('/register', register);

// 사용자 로그인
router.post('/login', login);

// 회원 리스트 반환
router.get('/users', getUsers);

router.get('/me', authenticate, getCurrentUser); // 인증 미들웨어 적용

export default router;
