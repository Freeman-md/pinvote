import express from 'express';
import { index, view } from '../controllers/index-controller';
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.get('/:id', view)

module.exports = router;
