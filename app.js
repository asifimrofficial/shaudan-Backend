const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
const authRoute = require('./Routes/authRoute');
require('./Helpers/init_mongo');
const {verifyAccessToken}= require('./Helpers/jwtHelper')

const app = express()
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',verifyAccessToken,async (req,res,next)=>{
    console.log (req.headers['authorization']);
res.send('hi from get');
})
app.post('/',verifyAccessToken,async (req,res,next)=>{
    console.log (req.headers['authorization']);
res.send('hi from post');
})
app.use('/auth', authRoute);

//error handler middleware
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
});


app.listen(process.env.PORT , ()=>{
    console.log(`server running on port ${process.env.PORT}`)
})