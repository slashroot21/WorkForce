import asyncHandler from 'express-async-handler'
import APIFeatures from './../util/apiFeatures.js'

export const deleteOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new Error('No document found with that ID'));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

export const updateOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new Error('No document found with that ID'));
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const createOne = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    });
});

export const getOne = (Model, popOptions) => asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
        return next(new Error('No document found with that ID'));
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const getAll = Model => asyncHandler(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.runnerId) filter = { runner: req.params.runnerId };

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        data: doc

    });
});
