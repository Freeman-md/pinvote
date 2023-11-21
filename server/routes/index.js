import express from 'express';
import { index, view, viewVoters } from '../controllers/index-controller';
import { param } from 'express-validator';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/polls/:id', param('id').trim().notEmpty().escape(), view)

router.get('/polls/:id/voters', viewVoters)

module.exports = router;
