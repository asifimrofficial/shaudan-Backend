const express = require('express');
const router= express.Router();
const Price= require('../Models/Price.model');
const createError=require('http-errors');

router.get('/:id',async(req,res,next)=>{
try {
    const price=await Price.findById(req.params.id);
    if(!price){throw createError.NotFound('Price not found')}
    res.status(200).send(price);
}
catch (error) {
    next(error);
}
});

router.post('/',async(req,res,next)=>{
    try {
        const price=new Price({
            price:req.body.price,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
        });
        const savedPrice= await price.save();
        if(!savedPrice){throw createError[400]("Price not saved to database")}
        res.status(200).send(savedPrice);

    } catch (error) {
        next(error);
    }});
router.put('/:id',async(req,res,next)=>{
    try {
        const price= await Price.findByIdAndUpdate(
            req.params.id
            ,
            {
            price:req.body.price,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            },{new:true}
            );
        if(!price){throw createError.NotFound('Price not found')}
            res.status(200).send(price);
        } catch (error) {  
        next(error);
    }});
router.delete('/:id',async(req,res,next)=>{
    try {
        const price= await Price.findByIdAndDelete(req.params.id);
        if(!price){throw createError.NotFound('Price not found')}
            res.status(200).send(price);
        } catch (error) {  
        next(error);
    }});
module.exports=router;