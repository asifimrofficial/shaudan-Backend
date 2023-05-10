const express = require('express');
const router= express.Router();
const Address= require('../Models/Adress.model');
const createError=require('http-errors');

router.get('/:id',async(req,res,next)=>{
try {
    const address=await Address.findById(req.params.id);
    if(!address){throw createError.NotFound('Address not found')}
    res.send(address);
} catch (error) {
    next(error);
}

});

router.post('/',async(req,res,next)=>{
    try {
        
        const address=new Address({
            street:req.body.street,
            houseNumber:req.body.houseNumber,
            city:req.body.city,
            postalCode:req.body.postalCode,
            state:req.body.state,
            country:req.body.country,
            addressType:req.body.addressType,
           // location:req.body.location
        });

        const saveAddress= await address.save();
        if(!saveAddress){throw createError[400]("address not saved to database")}
    } catch (error) {
        next(error);
    }
});
router.put('/:id',async(req,res,next)=>{
    try {
        const address= await Address.findByIdAndUpdate(
            req.params.id
            ,
            {
            street:req.body.street,
            houseNumber:req.body.houseNumber,
            city:req.body.city,
            postalCode:req.body.postalCode,
            state:req.body.state,
            country:req.body.country,
            string:req.body.string,
            location:req.body.location
            },{new:true}
            );
        if(!address){throw createError.NotFound('address not found')}
            res.status(200).send(address);


    } catch (error) {
        next(error);
    }


});
router.delete('/:id',async(req,res,next)=>{
    try {
        const address= await Address.findByIdAndDelete(req.params.id);
        if(!address){throw createError[400]('address not Deleted')}
        res.status(200).send({success:true,message: "Address deleted"});
    } catch (error) {
        next(error);
    }


});

module.exports=router;