import express from 'express';

import pollRouter from './poll'

const router = express.Router();

router.use('/polls', pollRouter)

module.exports = router;
