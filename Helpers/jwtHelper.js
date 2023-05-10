const jwt = require('jsonwebtoken');
const createError = require('http-errors');



module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={
            userId: userId,
            role: userId.role,
            }
            const secret =  process.env.ACCESS_TOKEN_SECRET;
            const options={
                expiresIn: "2d",
                issuer: "shaudan.com",
                audience: userId
            }
            jwt.sign(payload, secret, options, (err, token)=>{
                if(err){
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    },
    verifyAccessToken: (req,res,next)=>{
        if(!req.headers['authorization'])
        {
            return next(createError.Unauthorized());
        }

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ');
        const token= bearerToken[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,req,res)=>{
            if(err){
                if(err.name === 'JsonWebTokenError'){
                    return next(createError.Unauthorized());
                }else{
                return next(createError.Unauthorized(err.message))}
            }

            req.payload= payload
            console.log(payload);
            next();
        })
    },
    signRefreshToken:(userId)=>{ 
        return new Promise((resolve,reject)=>{
            const payload={
            
            }
            const secret =  process.env.REFRESH_TOKEN_SECRET;
            const options={
                expiresIn: "1y",
                issuer: "shaudan.com",
                audience: userId
            }
            jwt.sign(payload, secret, options, (err, token)=>{
                if(err){
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    },
    verfiyRefreshToken: (refreshToken)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,req,res)=>{
                if(err){return reject(createError.Unauthorized())}
    
                const userId= payload.aud;
                resolve(userId);
            })
        })
    }

}