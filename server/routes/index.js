import express from 'express';
import { index, view, viewVoters } from '../controllers/index-controller';
import { validateParam } from '../middlewares/query-param-validation';
import { vote } from '../controllers/vote-controller';
import { validateOptionInPoll } from '../middlewares/poll-request-validation';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/polls/:id', validateParam('id'), view)

router.post('/polls/:id/vote', validateParam(['id']), validateOptionInPoll, vote)

router.get('/polls/:id/voters', viewVoters)

module.exports = router;
