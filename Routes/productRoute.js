const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');
const Price = require('../Models/Price.model');
const createError = require('http-errors');
const {verifyAccessToken, verfiyRefreshToken} = require('../Helpers/jwtHelper');
const uploadImages=require('../utils/imageUploader');
const upload=require('../utils/multer');
const {deleteProductImages,uploads}=require('../utils/cloudinary');

router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) { throw createError.NotFound('Product not found') }
        res.status(200).send({success:true,data:product,message:"Product found"});
    } catch (error) {
        next(error);
    }

});
//url 


router.get('/', async (req, res, next) => {
    try {
        const product = await Product.find();
        if (!product) { throw createError.NotFound('Product not found') }
        res.status(200).send({success:true,data:product,message:"Product found"});
    } catch (error) {
        next(error);
    }

});

router.post('/' ,verifyAccessToken,async (req, res, next) => {
    try {
        const product = new Product({
            "title": req.body.title,
            "category": req.body.category,
            "price": req.body.price,
            "quantity": req.body.quantity,
            "description": req.body.description,
            "images": req.body.images,
            "tags": req.body.tags,
            "WholeSaler":req.body.WholeSaler,
            'rating':req.body.rating

        });
        const savedProduct = await product.save();
        if (!savedProduct) { throw createError[400]("Product not saved to database") }
        res.status(200).send({success:true,data:savedProduct,message:"Product created"});
   
    } catch (error) {
        next(error);
    }
});

//TODO: Update product

router.put('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        
        const files = req.files;
        
       
        
        const price= req.body.price;
        const Oldproduct= await findById(req.params.id);

        if (!Product) { throw createError.NotFound('Product not found') }
        uploadedImages = await uploadImages(files);
        const product = new Product({
            "name": req.body.name,
            "name":"abcef",
            "category": req.body.category,
           "price":savedPrice._id ||product.price,
            "quantity": req.body.quantity,
            "description": req.body.description,
            "images": uploadedImages,
            "tags": req.body.tags

        });

        const savedProduct = await product.save();
        if (!savedProduct) { throw createError[400]("Product not saved to database") }
           
            res.status(200).send({success:true,data:product,message:"Product Updated`"});

        

    } catch (error) {
        next(error);
    }


});


//write dummy data for post product for above api
//{
//     "name": "product 1",
//     "category": "5f9e1b7b9c9b7b1e0c3b3b1c",
//     "price": {
//         "price": 100,
//         "startDate": "2020-10-30T00:00:00.000Z",
//         "endDate": "2020-10-30T00:00:00.000Z"
//     },
//     "quantity": 10,
//     "description": "this is product 1",
//     "images": [
//         "https://res.cloudinary.com/dxqnb8xjb/image/upload/v1604064179/Products/2020-10-30T00:00:00.000Z/1604064178990-IMG_20191231_123456.jpg.jpg",
//         "https://res.cloudinary.com/dxqnb8xjb/image/upload/v1604064179/Products/2020-10-30T00:00:00.000Z/1604064178990-IMG_20191231_123456.jpg.jpg"
//     ],
//     "tags": [
//         "tag1",
//         "tag2"
//     ]

// }


router.delete('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log(product);
        if (!product) { throw createError[400]('Product not Deleted') }
        res.status(200).send({ success: true, message: "Product deleted" });
    } catch (error) {
        next(error);
    }


});
// get count of products
router.get('/get/count',verfiyRefreshToken, async (req, res, next) => {
    try {
        const productCount = await Product.countDocuments((count) => count);
        if (!productCount) { throw createError[400]('Product not found') }
        res.status(200).send({success:true,data:productCount,message:"Product found"});
    } catch (error) {
        next(error);
    }
});
//get product by tags
router.get('/get/tags',verifyAccessToken, async (req, res, next) => {
    try {
        const productTags = await Product.find({ tags: req.body.tags });
        if (!product) { throw createError[400]('Product not found') }
        res.status(200).send({success:true,data:productTags,message:"Product found"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;

