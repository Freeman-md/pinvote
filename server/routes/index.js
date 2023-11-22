import express from 'express';
import { index, view, viewVoters } from '../controllers/index-controller';
import { param } from 'express-validator';
import { validateParam } from '../middlewares/query-param-validation';
import { vote } from '../controllers/vote-controller';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/polls/:id', validateParam('id'), view)

router.post('/polls/:pollId/vote/:optionId', validateParam(['pollId', 'optionId']), vote)

router.get('/polls/:id/voters', viewVoters)

module.exports = router;
