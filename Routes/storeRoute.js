const express = require('express');
const router= express.Router();
const Store= require('../Models/Store.model');
const createError=require('http-errors');
const {verifyAccessToken, verfiyRefreshToken} = require('../Helpers/jwtHelper');
router.get('/:id',async(req,res,next)=>{
try {
    const store=await Store.findById(req.params.id);
    if(!store){throw createError.NotFound('Store not found')}
    res.send(store);
}   
catch (error) {
    next(error);
}

});

router.post('/',verifyAccessToken,async(req,res,next)=>{
    try {
        const doesExist = await Store.find({name:req.body.owner});
        if(doesExist){throw createError.Conflict(`${req.body.owner} already has a store`)};
        const store=new Store({
            name:req.body.name,
            about:req.body.about,
            address:req.body.address,
            coverPicture:req.body.coverPicture,
            logo:req.body.logo,
            storeType:req.body.storeType,
            owner:req.body.owner,
            productCatalog:req.body.productCatalog,
            reviews:req.body.reviews,
            status:req.body.status,
            contact:req.body.contact
        });

        const saveStore= await store.save();
        if(!saveStore){throw createError[400]("store not saved to database")}
    } catch (error) {
        next(error);
    }
});

router.put('/:id',verifyAccessToken,async(req,res,next)=>{
    try {
        const store= await Store.findByIdAndUpdate(
            req.params.id
            ,
            {
            name:req.body.name,
            about:req.body.about,
            address:req.body.address,
            coverPicture:req.body.coverPicture,
            logo:req.body.logo,
            storeType:req.body.storeType,
            owner:req.body.owner,
            productCatalog:req.body.productCatalog,
            reviews:req.body.reviews,
            status:req.body.status,
            contact:req.body.contact
            },{new:true}
            );
        if(!store){throw createError.NotFound('store not found')}
            res.status(200).send(store);
        } catch (error) {
        next(error);
    }
});

router.delete('/:id',verifyAccessToken,async(req,res,next)=>{
    try {
        const store= await Store.findByIdAndDelete(req.params.id);
        if(!store){throw createError.NotFound('store not found')}
            res.status(200).send(store);
        } catch (error) {
        next(error);
    }
}   
);

module.exports=router;
