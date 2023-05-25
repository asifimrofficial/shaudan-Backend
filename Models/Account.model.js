const mongoose= require('mongoose');
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const accountSchema = new mongoose.Schema({
email: {
    type: String,
    required: true,
    unique: true
},
hashedPassword: {
    type: String,
    required: true
},
lockOutTime: {
    type: Date,
    default: null
},
loginAttempts: {
    type: Number,
},
lockOutEnabled: {
    type: Boolean,
},
resetPasswordToken: {
    type: String,
},
resetPasswordDate: {
    type: Date,
},
});


module.exports = mongoose.model('Account', accountSchema);