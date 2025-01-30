import express from 'express';
import { issueBBL, getAllBBLs } from '../controllers/bblController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/issue', authenticate, issueBBL); // BBL 생성 API
router.get('/list', getAllBBLs); // 모든 BBL 리스트 조회

export default router;
