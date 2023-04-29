const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    address: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    CNIC: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
    },

});

module.exports = mongoose.model('User', userSchema);