const express = require('express')
const router = express.Router()
const createError=require('http-errors')
const Account= require('../Models/Account');
const {authSchema}= require('../Helpers/validationSchema');
const {signAccessToken,signRefreshToken,verfiyRefreshToken}= require('../Helpers/jwtHelper');
const cryptojs = require('crypto-js');

router.get('/get',async (req,res,next)=>{
    console.log (req.headers['authorization']);
res.send('hi from get');
})

router.post('/register', async (req, res,next)=>{
    try {
        const result = await authSchema.validateAsync(req.body)
        const doesExist= await Account.findOne({email: result.email})
        if(doesExist){
            throw createError.Conflict(`${email} is already registered`)
        }
        
        const account= new Account(result);

        const savedAccount= await account.save();
        const refreshToken= await signRefreshToken(savedAccount.id);
        const accessToken = await signAccessToken(savedAccount.id);
        res.send({accessToken,refreshToken});
    } catch (error) {
        if(error.isJoi== true) error.status=422;
        next(error)
    }
});

router.post('/login',async (req, res,next)=>{
   try {
    console.log(req.body);
    const result= await authSchema.validateAsync(req.body);
    
    const account= await Account.findOne({email: result.email});
    console.log(`account is${account}`);
    if(!account){
        throw createError.NotFound('Account not Found');
    }

    //const Password = cryptojs.AES.decrypt(account.hashedPassword,account.salt).toString(cryptojs.enc.Utf8);
    const Password ="U2FsdGVkX18ASnsRB8dko/fi5eXHWWXcZRXJ1vHbews=";

    isMatch= Password === account.hashedPassword;
    console.log(`isMatch is ${Password}`);
   // const isMatch = await account.isValidPassword(result.hashedPassword);
    if(!isMatch){
        throw createError.Unauthorized('Username/password not valid');
    }
    const accessToken= await signAccessToken(account.id);
    res.send({accessToken});



   } catch (error) {
    if(error.isJoi== true)
    { error.status=400,
    error.message=error};
    next(error)
   }
});

router.post('/refresh-token', async(req, res,next)=>{
    const {refreshToken}= req.body;
    try {
        if(!refreshToken) throw createError.BadRequest();
       const accountId= await verfiyRefreshToken(refreshToken);
        const accessToken= await signAccessToken(accountId);
        const refToken= await signRefreshToken(accountId);
        res.send({accessToken: accessToken, refreshToken: refToken});
        

    } catch (error) {
     next(error);
    }
   
});
router.delete('/logout', (req, res)=>{

    res.send('logout')
});





module.exports = router;
