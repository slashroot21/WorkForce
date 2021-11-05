import express from 'express';

import { getRunners, getRunner, createRunner, updateRunner, deleteRunner, googleLogin, } from '../controllers/runnerController.js';
import { setRunnerUserIds, createReview } from './../controllers/reviewController.js';
import reviewRouter from './../routes/reviewRoutes.js';

const router = express.Router();

router.use('/:runnerId/reviews', reviewRouter);

router.route('/')
    .get(getRunners)
    .post(createRunner);

router.route('/:id')
    .get(getRunner)
    .patch(updateRunner)
    .delete(deleteRunner);

router.route('/googlelogin')
    .post(googleLogin);


export default router;