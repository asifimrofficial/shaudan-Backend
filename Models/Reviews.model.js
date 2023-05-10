const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    reaction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reaction',
        }
    }, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);
