import express from 'express';
import { create, index } from '../controllers/user-controller';
const router = express.Router();


router.get('/polls', index);

router.get('/polls/create', create)

module.exports = router;
