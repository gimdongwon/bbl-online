import express from 'express';
import { register, login, getUsers } from '../controllers/authController';

const router = express.Router();

// 사용자 등록
router.post('/register', register);

// 사용자 로그인
router.post('/login', login);

// 회원 리스트 반환
router.get('/users', getUsers);

export default router;
