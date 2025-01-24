import express from 'express';
import { issueBBL, getAllBBLs } from '../controllers/bblController';

const router = express.Router();

router.post('/issue', issueBBL); // BBL 생성 API
router.get('/list', getAllBBLs); // 모든 BBL 리스트 조회

export default router;
