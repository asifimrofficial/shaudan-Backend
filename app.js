const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const createError = require('http-errors')
require('dotenv').config()

const upload = require('./utils/multer')

const cloudinary = require('./utils/cloudinary')

const fs = require('fs')

const authRoute = require('./Routes/authRoute');
const userRoute= require('./Routes/userRoute');
const addressRoute= require('./Routes/addressRoute');
const contactRoute = require('./Routes/contactRoute')
const locationRoute = require('./Routes/locationRoute')
const productRoute = require('./Routes/productRoute')
const orderRoute = require('./Routes/ordersRoute')
const CategoryRoute= require('./Routes/categoryRoute')
require('./Helpers/init_mongo');
const {verifyAccessToken}= require('./Helpers/jwtHelper')

const app = express()
app.use(cors())
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
app.use('/users', userRoute);
//app.use('/address',addressRoute);
app.use('/contact',contactRoute);
app.use('/location',locationRoute)
app.use('/products',productRoute);
 app.use('/order',orderRoute);
//  app.use('/category',CategoryRoute);

 
//error handler middleware
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            success:false,
            message: err.message
        }
    })
});


app.listen(process.env.PORT|| 3000 , ()=>{
    console.log(`server running on http://${process.env.PORT}/ on process ${process.pid}`);
})