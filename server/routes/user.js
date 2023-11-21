import express from 'express';
import { create, edit, index, store } from '../controllers/user-controller';
import { validatePoll } from '../middlewares/poll-request-validation';
const router = express.Router();


router.get('/polls', index);

router.get('/polls/create', create)

router.get('/polls/:id/edit', edit)

router.post('/polls', validatePoll, store)

module.exports = router;
