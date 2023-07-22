const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    logo: {
        type: String,
    },
    address: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    contact: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    storeType: {
        type: String,
        required: true,
    },
    reviews: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }
}, {timestamps: true});

module.exports = mongoose.model('Store', storeSchema);