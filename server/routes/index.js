import express from 'express';
import { index, view, viewVoters } from '../controllers/index-controller';
import { query } from 'express-validator';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/polls/:id', query('id').trim().notEmpty().escape(), view)

router.get('/polls/:id/voters', viewVoters)

module.exports = router;
