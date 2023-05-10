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
        next();
    } catch (error) {
        next(error);
    }
});
accountSchema.methods.isValidPassword = async function(newPassword){
    try {
        console.log(this.hashedPassword);
        console.log(this.salt);

        // const Password = cryptojs.AES.decrypt("U2FsdGVkX18ASnsRB8dko/fi5eXHWWXcZRXJ1vHbews=" ,"1122");
       // console.log(`Password: ${Password}`);
        return Password === newPassword;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoose.model('Account', accountSchema);