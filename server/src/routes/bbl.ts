import express from 'express';
import { issueBBL, getBBLList } from '../controllers/bblController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/issue', authenticate, issueBBL); // BBL 생성 API
router.get('/list', authenticate, getBBLList); // 모든 BBL 리스트 조회

export default router;
