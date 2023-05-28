const { required } = require('joi');
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
        // required: true,
    },
    contact: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
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
    image: 
        {
            url: String,
            public_id: String,
            // required    : true
        }
    ,
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);