const express= require
const router= express.Router();
const Review= require('../Models/Reviews.model');
const createError=require('http-errors');

router.get('/:id',async(req,res,next)=>{
try {
    const review=await Review.findById(req.params.id);
    if(!review){throw createError.NotFound('Review not found')}
    res.status(200).send(review);
}
catch (error) {
    next(error);
}

});


router.post('/',async(req,res,next)=>{
    try {
        const review=new Review({
            user:req.body.user,
            comment:req.body.comment,
            images:req.body.images,
            reaction:req.body.reaction,
        });
        const savedReview= await review.save();
        if(!savedReview){throw createError[400]("Review not saved to database")}
        res.status(200).send(savedReview);

    } catch (error) {
        next(error);
    }}
);

router.put('/:id',async(req,res,next)=>{
    try {
        const review= await Review.findByIdAndUpdate(
            req.params.id
            ,
            {
            user:req.body.user,
            comment:req.body.comment,
            images:req.body.images,
            reaction:req.body.reaction,
            },{new:true}
            );
        if(!review){throw createError.NotFound('Review not found')}
            res.status(200).send(review);
        } catch (error) {  
        next(error);
    }}
);

router.delete('/:id',async(req,res,next)=>{
    try {
        const review= await Review.findByIdAndDelete(req.params.id);
        if(!review){throw createError.NotFound('Review not found')}
            res.status(200).send(review);
        } catch (error) {  
        next(error);
    }}
);

module.exports=router;

