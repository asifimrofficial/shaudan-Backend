const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const Account = require('../Models/Account.model');
const { authSchema } = require('../Helpers/validationSchema');
const { signAccessToken, signRefreshToken, verfiyRefreshToken } = require('../Helpers/jwtHelper');
const cryptojs = require('crypto-js');

router.get('/get', async (req, res, next) => {
    console.log(req.headers['authorization']);
    res.send('hi from get');
})

router.post('/signup', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const doesExist =false 
        //= await Account.findOne({ email: result.email })
        if (doesExist) {
            throw createError.Conflict(`${email} is already registered`)
        }
        else {
            result.salt = cryptojs.lib.WordArray.random(16).toString();
            const account = new Account(result);

            const savedAccount = await account.save();
            const refreshToken = await signRefreshToken(savedAccount.id);
            const accessToken = await signAccessToken(savedAccount.id);
            res.send({ accessToken, refreshToken });
        }
    } catch (error) {
        if (error.isJoi == true) error.status = 422;
        next(error)
    }
});

router.post('/login', async (req, res, next) => {
    try {

        console.log(req.body);
        const result = await authSchema.validateAsync(req.body);

        const account = await Account.findOne({ email: result.email });
        console.log(`account is${account}`);
        if (!account) {
            throw createError.NotFound('Account not Found');
        }
        if(account.loginAttempts>=3)
        {
            throw createError.Unauthorized('Account is locked');
            account.isLocked=true;
            await account.save();
        }
        const Password = cryptojs.AES.decrypt(account.hashedPassword, account.salt).toString(cryptojs.enc.Utf8);
        const isMatch = account.isValidPassword(Password);
        if (!isMatch) {
            account.loginAttempts += 1;
            await account.save();
            throw createError.Unauthorized('Username/password not valid');
        }
        const accessToken = await signAccessToken(account.id);
        res.send({ accessToken });



    } catch (error) {
        if (error.isJoi == true) {
            error.status = 400,
            error.message = error
        };
        next(error)
    }
});

router.post('/refresh-token', async (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) throw createError.BadRequest();
        const accountId = await verfiyRefreshToken(refreshToken);
        const accessToken = await signAccessToken(accountId);
        const refToken = await signRefreshToken(accountId);
        res.send({ accessToken: accessToken, refreshToken: refToken });


    } catch (error) {
        next(error);
    }

});

router.patch('/update-password', verfiyRefreshToken, async (req, res, next) => {
    try {
        const password= req.body.password;
        const account = await Account.findById(req.payload.aud);
        if (!account) { throw createError[400]('account not found') }
        const oldPassword = cryptojs.AES.decrypt(account.hashedPassword, account.salt).toString(cryptojs.enc.Utf8);
        const isMatch = account.isValidPassword(oldPassword);
        if (!isMatch) {
            throw createError.Unauthorized('Username/password not valid');
        }
        const result = await authSchema.validateAsync(req.body);
        const salt = cryptojs.lib.WordArray.random(16).toString();
        const hashedPassword = cryptojs.AES.encrypt(result.password, salt).toString();
        
        account.hashedPassword = hashedPassword;
        account.salt = salt;
        const savedAccount = await account.save();
        res.status(200).send({ success: true, message: "password updated" });
        
    } catch (error) {
        next(error);
    }
});
        


router.delete('/:id', async (req, res, next) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) { throw createError[400]('account not Deleted') }
        res.status(200).send({ success: true, message: "account deleted" });
    } catch (error) {
        next(error);
    }


});





module.exports = router;
