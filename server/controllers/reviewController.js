import Review from './../models/reviewModel.js'
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

export const setRunnerUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.runner) req.body.runner = req.params.runnerId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const createReview = createOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);