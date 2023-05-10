const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reactionSchema = new Schema({
    like:
    {
        type: Number,
        default: 0
    },
    dislike:
    {
        type: Number,
        default: 0
    },
    reactions:{
        type: Number,
        default: 0
    },

    } , {timestamps: true});

const Reaction = mongoose.model('Reaction', reactionSchema);