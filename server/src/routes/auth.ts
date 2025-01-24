import express from 'express';
import {
  register,
  login,
  getUsers,
  getCurrentUser,
  logout,
} from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register); // 사용자 등록
router.post('/login', login); // 사용자 로그인
router.get('/users', getUsers); // 회원 리스트 반환
router.get('/me', authenticate, getCurrentUser); // 인증 미들웨어 적용
router.post('/logout', logout); // 로그아웃 API 추가

export default router;
