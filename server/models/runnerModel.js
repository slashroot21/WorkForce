import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

const runnerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name!']
        },
        dob: {
            type: Date,
            // required: [true, 'Please tell us your date of birth!']
            default: Date.now(),
        },
        despricption: String,
        email: {
            type: String,
            trim: true,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        image: String,
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false
        },
        avgRatings: {
            type: Number,
            default: 4,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
            set: val => Math.round(val * 10) / 10
        },
        numRatings: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            // required: true,
            default: 0,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },
)

// Virtual populate
runnerSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'runner',
    localField: '_id'
});

runnerSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

var Runner = mongoose.model('Runner', runnerSchema);

export default Runner;