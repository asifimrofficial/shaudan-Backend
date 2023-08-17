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
const WholeSalerRoute = require('./Routes/wholeSalerRoute')
const RetailerRoute = require('./Routes/retialerRoutes')
const storeRoute = require('./Routes/storeRoute')
const imageRoute = require('./Routes/uploadImageRoute');
const cartRoute = require('./Routes/cartRoute');
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


app.use(`/${process.env.Base_api}/auth`, authRoute);
app.use(`/${process.env.Base_api}/users`, userRoute);
app.use(`/${process.env.Base_api}/address`,addressRoute);
app.use(`/${process.env.Base_api}/contact`,contactRoute);
app.use(`/${process.env.Base_api}/location`,locationRoute)
app.use(`/${process.env.Base_api}/products`,productRoute);
app.use(`/${process.env.Base_api}/order`,orderRoute);
app.use(`/${process.env.Base_api}/category`,CategoryRoute);
app.use(`/${process.env.Base_api}/users/wholesaler`,WholeSalerRoute);
app.use(`/${process.env.Base_api}/users/retailer`,RetailerRoute);
app.use(`/${process.env.Base_api}/store`,storeRoute);
app.use(`/${process.env.Base_api}/upload`,imageRoute);
app.use(`/${process.env.Base_api}/cart`,cartRoute);


 
//error handler middleware
app.use((err, req, res, next)=>{
    res.status(err.status || 500).send({
        message: err.message,
        data: "",
        success: false
    });
});

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server running on http://${process.env.PORT}/ on process ${process.pid}`);
})