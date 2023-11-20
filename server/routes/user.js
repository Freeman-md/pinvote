import express from 'express';
import { create, edit, index } from '../controllers/user-controller';
const router = express.Router();


router.get('/polls', index);

router.get('/polls/create', create)

router.get('/polls/:id/edit', edit)

module.exports = router;
