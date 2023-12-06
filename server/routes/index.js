import express from 'express';
import IndexController from '../controllers/index-controller';
import { validateParam } from '../requests/query-param-validator';
import VoteController from '../controllers/vote-controller';
import PollValidator from '../requests/poll-validator';
const router = express.Router();

/* GET home page. */
router.get('/', IndexController.index);

router.get('/polls/:id', validateParam('id'), IndexController.view)

router.post('/polls/:id/vote', validateParam(['id']), PollValidator.validateOptionInPoll, VoteController.vote)

router.get('/polls/:id/voters', validateParam('id'), IndexController.viewVoters)

router.get('/csrf-token', (req, res, next) => {
    res.json({
      csrfToken: req.csrfToken()
    })
  })

module.exports = router;
