import express from 'express';
import { index, view, viewVoters } from '../controllers/index-controller';
import { validateParam } from '../middlewares/query-param-validation';
import { vote } from '../controllers/vote-controller';
import PollValidator from '../requests/poll-validator';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/polls/:id', validateParam('id'), view)

router.post('/polls/:id/vote', validateParam(['id']), PollValidator.validateOptionInPoll, vote)

router.get('/polls/:id/voters', validateParam('id'), viewVoters)

router.get('/csrf-token', (req, res, next) => {
    res.json({
      csrfToken: req.csrfToken()
    })
  })

module.exports = router;
