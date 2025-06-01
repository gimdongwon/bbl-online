import express from 'express';
import {
  register,
  login,
  getUsers,
  getCurrentUser,
  logout,
  changePassword,
  uploadUsersFromExcel,
} from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/register', register); // 사용자 등록
router.post('/login', login); // 사용자 로그인
router.get('/users', getUsers); // 회원 리스트 반환
router.get('/me', authenticate, getCurrentUser); // 인증 미들웨어 적용
router.post('/logout', logout); // 로그아웃 API 추가
router.patch('/change-password', authenticate, changePassword); // 비밀번호 변경
router.post('/upload-users', upload.single('file'), uploadUsersFromExcel);

export default router;
