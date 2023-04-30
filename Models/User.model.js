const mongoose = require('mongoose');
const cryptojs = require('crypto-js');

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
    salt: {
        type: String,
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
    }
}, {timestamps: true});


userSchema.pre('save', async function(next){
    try {
        
        const hashedPassword = cryptojs.AES.encrypt(this.password,this.salt).toString();
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.isValidPassword = async function(newPassword){
    try {
        const hashedPassword = cryptojs.AES.decrypt(this.password ,this.salt ).toString(cryptojs.enc.Utf8);
        console.log(hashedPassword);
        return hashedPassword === newPassword;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('User', userSchema);