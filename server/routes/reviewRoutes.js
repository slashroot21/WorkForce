import express from 'express';
import { getAllReviews, createReview, getReview, updateReview, deleteReview, setRunnerUserIds } from '../controllers/reviewController.js';
import { protect } from './../controllers/authController.js'

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getAllReviews)
    .post(protect, setRunnerUserIds, createReview);

router
    .route('/:id')
    .get(getReview)
    .patch(protect, updateReview)
    .delete(protect, deleteReview);

export default router;