import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

const taskSchema = mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },
        title: {
            type: String,
            required: [true, 'Please tell us your name!']
        },
        despricption: String,
        location: {
            type: String,
            required: [true, 'Please tell us your location!']
        },
        date: {
            type: Date,
            required: true,
            validate: validator.isDate,
            default: Date.now
        },
        duration: {
            type: String,
            required: [true, 'Please tell us the duration of your task']
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },
)

taskSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

var Task = mongoose.model('Task', taskSchema);

export default Task;