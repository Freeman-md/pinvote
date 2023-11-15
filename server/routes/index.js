import express from 'express';
import { index, view, viewVoters } from '../controllers/index-controller';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/:id', view)

router.get('/:id/voters', viewVoters)

module.exports = router;
