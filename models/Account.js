const mongoose= require('mongoose');

const accountSchema = new mongoose.Schema({
emai: {
    type: String,
    required: true,
    unique: true
},
hashedPassword: {
    type: String,
    required: true
},
salt: { 
    type: String,
    required: true
},
lockOutTime: {
    type: Date,
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