import express from 'express';
import { index } from '../controllers/user-controller';
const router = express.Router();


router.get('/dashboard', index);

module.exports = router;
