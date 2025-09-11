 import express from 'express';
import { createInquiry, getAllInquiry, deleteInquiry } from '../controllers/contact.controllers.js';

const router = express.Router();

router.post('/save', createInquiry);
router.get('/getall', getAllInquiry);
router.delete('/delete/:id', deleteInquiry);

export default router;
