const express = require('express');
const router= express.Router();
const User= require('../Models/Adress.model');
const createError=require('http-errors')
const ageCalculator = require('../Helpers/ageCalculator');
const uploadImage=require('../utils/imageUploader');
const upload=require('../utils/multer');
router.get('/:id',async(req,res,next)=>{
    try {       
        const user= await User.findById(req.params.id).populate('account');;
        if(!user)
        {
        throw createError.NotFound('user details not found');
        }
        res.send(user);
    } catch (error) {
     next(error);   
    }
});

router.post('/',upload.array('image', 1),async(req,res,next)=>{
    try {


        const age = ageCalculator(req.body.DOB);
        const files = req.files;
        const uploadedImages = await uploadImage(files);
        console.log(uploadedImages);
        const user = new User({
           name:req.body.name,
           age:age,
           account:req.body.account,
          // address: req.body.address,
           contact:req.body.contact,
           DOB:req.body.DOB,
            image:uploadedImages[0].url,
           role:req.body.role,
        });

        const savedUser= await user.save();
        if(!savedUser)
        {

            throw createError[500]('User not saved');
        }
        res.send(user);
  
    } catch (error) {
     next(error);   
    }
});

router.delete('/:id', async(req,res,next)=>{
    try {
       const oldUser= await User.findByIdAndRemove(req.params.id);
       if(oldUser){res.send({success: true, message:"User deleted Successfully"})}
       else{
        throw createError[500]("user not found");
       }

        

    } catch (error) {
        next(error);
    }
});

router.put('/:id',async(req,res,next)=>{
    try {
        const user= await User.findByIdAndUpdate(
            req.params.id,
            {
                name:req.body.name,
                age:req.body.age,
                account:req.body.account,
               // address: req.body.address,
                DOB:req.body.DOB,   
            },{new:true}
        )
        if(!user){
            throw createError.NotFound('User not exist in database');
        }
        res.send(user);
    } catch (error) {
        next(error);
    }
});
router.get('/count', async (req, res,next) =>{
    try {
        
        const userCount = await User.countDocuments((count) => count)
    
        if(!userCount) {
            throw createError[400]("no user exists");
        } 
        res.send({
            userCount: userCount
        });
    } catch (error) {
        next(error);
    }
});

module.exports=router;