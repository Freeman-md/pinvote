import express from 'express';
import { create, deletePoll, edit, index, store, update } from '../controllers/user-controller';
import { validatePoll, validatePollUpdate } from '../middlewares/poll-request-validation';
import { param } from 'express-validator';
const router = express.Router();


router.get('/polls', index);

router.get('/polls/create', create)

router.get('/polls/:id/edit', param('id').trim().notEmpty().escape(), edit)

router.post('/polls', validatePoll, store)

router.post('/polls/:id/update', param('id').trim().notEmpty().escape(), validatePollUpdate, update)

router.post('/polls/:id/delete', param('id').trim().notEmpty().escape(), deletePoll)

module.exports = router;
