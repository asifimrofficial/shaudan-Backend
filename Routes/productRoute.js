const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.model');
const Price = require('../Models/Price.model');
const createError = require('http-errors');
const {verifyAccessToken} = require('../Helpers/jwtHelper');
const {uploads}=require('../utils/cloudinary');
const uploadImages=require('../utils/imageUploader');
const upload=require('../utils/multer');
router.get('/', async (req, res, next) => {
    try {
        const productList = await Product.find();
        if (!productList) { throw createError.NotFound('Product not found') }
        res.status(200).send({message: "success",productList});
    } catch (error) {
        next(error);
    }

});
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('price');
        if (!product) { throw createError.NotFound('Product not found') }
        res.status(200).send(product);
    } catch (error) {
        next(error);
    }

});
router.get('/', async (req, res, next) => {
    try {
        const product = await Product.find().populate('price');
        if (!product) { throw createError.NotFound('Products not found') }
        res.status(200).send(product);``
    } catch (error) {
        next(error);
    }

});

router.post('/post' ,upload.array('image', 2),async (req, res, next) => {
    try {
        const files = req.files;
        const uploadedImages = await uploadImages(files);

        const priceobject= req.body.price;
        const priceitem = new Price({
            "price": priceobject.price,
            "startDate": priceobject.startDate,
            "endDate": priceobject.endDate,
        });
        const savedPriceItem= await priceitem.save();
        console.log(`${savedPriceItem}`);
        if (!savedPriceItem||!savedPriceItem) { throw createError[400]("Error occur while saving Price item or Images") }
       else{
            
        const product = new Product({
            "name": req.body.name,
            "name":"abcef",
            "category": req.body.category,
           //"price": savedPriceItem._id,
            "quantity": req.body.quantity,
            "description": req.body.description,
            "images": uploadedImages,
            "tags": req.body.tags

        });

        const savedProduct = await product.save();
        if (!savedProduct) { throw createError[400]("Product not saved to database") }
        res.status(200).send(savedProduct);
   }
    } catch (error) {
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        
        const product = await Product.findByIdAndUpdate(
            req.params.id
            ,
            {
            "name": req.body.name,
            "category": req.body.category,
            "price": req.body.price,
            "quantity": req.body.quantity,
            "description": req.body.description,
            "images": req.body.images,
            "tags": req.body.tags
            }, { new: true }
        );
        if (!product) { throw createError.NotFound('Product not found') }
        res.status(200).send(product);


    } catch (error) {
        next(error);
    }


});
router.delete('/:id', async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) { throw createError[400]('Product not Deleted') }
        res.status(200).send({ success: true, message: "Product deleted" });
    } catch (error) {
        next(error);
    }


});
// get count of products
router.get('/get/count', async (req, res, next) => {
    try {
        const productCount = await Product.countDocuments((count) => count);
        if (!productCount) { throw createError[400]('Product not found') }
        res.status(200).send({ count: productCount });
    } catch (error) {
        next(error);
    }
});
//get product by tags
router.get('/get/tags', async (req, res, next) => {
    try {
        const products = await Product.find({ tags: req.body.tags });
        if (!product) { throw createError[400]('Product not found') }
        res.status(200).send(products);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

//write dummy json data to post product
// {
//     "name": "product 1",
//     "category": "5f9e3b7b9d9b3e1f0c3b3b1e",
//     "price": 100,
//     "quantity": 10,
//     "description": "this is product 1",
//     "images": "https://picsum.photos/200/300",
//     "tags": ["tag1", "tag2"]
// }
