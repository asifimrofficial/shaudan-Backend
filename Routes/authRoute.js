const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const Account = require('../Models/Account.model');
const { authSchema } = require('../Helpers/validationSchema');
const { verifyAccessToken,signAccessToken, signRefreshToken, verfiyRefreshToken, } = require('../Helpers/jwtHelper');
// const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res, next) => {
    try {
        const body = req.body;

        const result = await authSchema.validateAsync(body);
        if (!result) {
            res.status(400).send({ success: false, message: "invalid data" });
        }
       
        const doesExist = await Account.findOne({ email: result.email })
        if (doesExist) {
            return res.send({ success: false, message: "email already exists" });
        }
        else {
            bcrypt.hash(result.password, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const account = new Account({
                        email: result.email,
                        hashedPassword: hash,
                        loginAttempts: 0,
                        isLocked: false
        
                    });
                    const savedAccount = await account.save();
                     const refreshToken = await signRefreshToken(savedAccount.id);
                    const accessToken = await signAccessToken(savedAccount.id);
            res.send({ success: true, message: "User created Successfully", data: { accesstoken: accessToken,  account_id: savedAccount._id } });
                }
            });

            
        }
    } catch (error) {
        if (error.isJoi == true) error.status = 422;
        next(error)
    }
});

router.post('/login', async (req, res, next) => {
    try {

        // console.log(req.body);
        const result = await authSchema.validateAsync(req.body);
        if (!result) {
            res.status(400).send({ success: false, message: "invalid data" });
        } else {
            const account = await Account.findOne({ email: result.email });
            console.log(`account is${account}`);
            if (!account) {
                return res.status(404).send({ success: false, message: "account not found" });
            }
            if (account.loginAttempts >= 3) {
                account.isLocked = true;
                await account.save();
               
                setTimeout(async () => {
                    account.loginAttempts = 0;
                    account.isLocked = false;
                    await account.save();
                    console.log("account is unlocked");
                }

                    , 8000);

                console.log(account.isLocked);
                return res.status(401).send({ success: false, message: "account is locked" });
            }


             bcrypt.compare(result.password, account.hashedPassword,async (err, isMatch) => {
                if (err) return res.status(400).send({ success: false, message: err.message });
                if (!isMatch) {
                    account.loginAttempts += 1;
                    account.save();
                    return res.status(401).send({ success: false, message: "Username/password not valid" });
                } else {
                    account.loginAttempts=0
                    const account_saved=await account.save()
                    if(account_saved)
                    {
                    const accessToken = await signAccessToken(account.id);
                    return res.status(200).send({ success:true,message:"User found",data:{ accesstoken:accessToken,account_id:account._id} });
                    }
                }
            });
        }

    } catch (error) {
        if (error.isJoi == true) {
            error.status = 400,
                error.message = error
        };
        next(error)
    }
});

router.post('/refresh-token',verifyAccessToken, async (req, res, next) => {
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

router.patch('/update-password', verifyAccessToken, async (req, res, next) => {
    try {
        const password = req.body.password;
        const account = await Account.findById(req.payload.aud);
        if (!account) { return res.status(404).send({ success: false, message: "account not found" });}
        const oldPassword = cryptojs.AES.decrypt(account.hashedPassword, account.salt).toString(cryptojs.enc.Utf8);
        const isMatch = account.isValidPassword(oldPassword);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: "old password is not correct" });
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



router.delete('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) { throw createError[400]('account not Deleted') }
        res.status(200).send({ success: true, message: "account deleted" });
    } catch (error) {
        next(error);
    }


});





module.exports = router;
