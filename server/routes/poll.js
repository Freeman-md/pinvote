import express from 'express';
import PollController from '../controllers/poll-controller';
import { param } from 'express-validator';
import PollValidator from '../requests/poll-validator';

const router = express.Router();

router.get('/', PollController.index);

router.get('/create', PollController.create)

router.post('/', PollValidator.validatePoll, PollValidator.validate, PollController.store)

router.get('/:id/edit', param('id').trim().notEmpty().escape(), PollController.edit)

router.post('/:id/update', param('id').trim().notEmpty().escape(), PollValidator.validatePollUpdate, PollValidator.validate, PollController.update)

router.post('/:id/delete', param('id').trim().notEmpty().escape(), PollController.delete)

module.exports = router;
