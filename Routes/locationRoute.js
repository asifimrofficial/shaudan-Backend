const express = require('express');
const router= express.Router();
const Location= require('../Models/Location.model');
const createError=require('http-errors');

router.get('/:id',async(req,res,next)=>{
try {
    const location=await Location.findById(req.params.id);
    if(!location){throw createError.NotFound('Location not found')}
    res.status(200).send(location);
} catch (error) {
    next(error);
}
});

router.post('/',async(req,res,next)=>{
    try {
        const location=new Location({
            latitude:req.body.latitude,
            longitude:req.body.longitude,
        });

        const saveLocation= await location.save();
        if(!savedLocation){throw createError[400]("location not saved to database")}
    } catch (error) {
        next(error);
    }
});
router.put('/:id',async(req,res,next)=>{
    try {
        const location= await Location.findByIdAndUpdate(
            req.params.id
            ,
            {
                latitude:req.body.latitude,
                longitude:req.body.longitude,
            },
            {new:true}
            );
        if(!location){throw createError.NotFound('location not found')}
            res.status(200).send(location);


    } catch (error) {
        next(error);
    }


});
router.delete('/:id',async(req,res,next)=>{
    try {
        const location= await location.findByIdAndDelete(req.params.id);
        if(!location){throw createError[400]('location not found')}
        res.status(200).send({success:true,message: "location deleted"});
    } catch (error) {
        next(error);
    }


});

module.exports=router;