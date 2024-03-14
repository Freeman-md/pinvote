import express from 'express';
import IndexController from '../controllers/index-controller';
import { validateParam, validateQuery } from '../requests/query-param-validator';
import VoteController from '../controllers/vote-controller';
import PollValidator from '../requests/poll-validator';
import BaseValidator from '../requests/validator';
import NotificationController from '../controllers/notification-controller';
const router = express.Router();

/* GET home page. */
router.get('/', validateQuery('searchTerm'), IndexController.index);

router.get('/polls/:id', validateParam('id'), IndexController.view)

router.post('/polls/:id/vote', validateParam(['id']), PollValidator.validateOptionExistsAndPollIsActive, VoteController.vote)

router.get('/polls/:id/voters', validateParam('id'), VoteController.view)

router.post('/notifications/:id/mark-as-read', validateParam('id'), NotificationController.markAsRead)

router.get('/csrf-token', (req, res, next) => {
    res.json({
      csrfToken: req.csrfToken()
    })
  })

module.exports = router;
