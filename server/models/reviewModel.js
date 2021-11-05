import mongoose from 'mongoose';
import Runner from './runnerModel.js';
const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        runner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Runner',
            required: [true, 'Review must belong to a runner.']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

reviewSchema.index({ runner: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name image'
    });
    next();
});

reviewSchema.statics.calcAverageRatings = async function (runnerId) {
    const stats = await this.aggregate([
        {
            $match: { runner: runnerId }
        },
        {
            $group: {
                _id: '$runner',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    // console.log(stats);

    if (stats.length > 0) {
        await Runner.findByIdAndUpdate(runnerId, {
            numRatings: stats[0].nRating,
            avgRatings: stats[0].avgRating
        });
    } else {
        await Runner.findByIdAndUpdate(runnerId, {
            numRatings: 0,
            avgRatings: 3
        });
    }
};

reviewSchema.post('save', function () {
    // this points to current review
    this.constructor.calcAverageRatings(this.runner);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne().clone();
    // console.log(this.r);
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.runner);
});

var Review = mongoose.model('Review', reviewSchema);

export default Review;