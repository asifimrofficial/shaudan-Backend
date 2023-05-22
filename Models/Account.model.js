const mongoose= require('mongoose');
const cryptojs = require('crypto-js');
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
salt: { 
    type: String,
    required:true
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

accountSchema.pre('save', async function(next){
    try {
        
        const Password = cryptojs.AES.encrypt(this.password,this.salt);
        this.hashedPassword = Password;
        console.log(this.hashedPassword);
        next();
    } catch (error) {
        console.log(error+"error in pre save");
        next(error);
    }
});
accountSchema.methods.isValidPassword = async function(newPassword){
    try {
       if(this.hashedPassword == newPassword)
        return true;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoose.model('Account', accountSchema);