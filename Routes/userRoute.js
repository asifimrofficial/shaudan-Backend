const express = require('express');
const router= express.Router();
const User= require('../Models/User.model');
const Address= require('../Models/Adress.model');
const createError=require('http-errors')
const ageCalculator = require('../Helpers/ageCalculator');
const uploadImages=require('../utils/imageUploader');
const upload=require('../utils/multer');
const {verifyAccessToken, verfiyRefreshToken} = require('../Helpers/jwtHelper');

const {uploads,uploadUserImageToCloudinary}=require('../utils/cloudinary');
router.get('/:id',verifyAccessToken,async(req,res,next)=>{
    try {       
        const user= await User.findById(req.params.id).populate('account');;
        if(!user)
        {
        throw createError.NotFound('user details not found');
        }
        res.send({success:true,data:user,message:"user details found"});
    } catch (error) {
     next(error);   
    }
});

router.post('/',verifyAccessToken,upload.array('image',1),async(req,res,next)=>{
    try {

        if(!req.files){
            return res.status(400).send({message: 'Please upload a file'});
        }

        const age = ageCalculator(req.body.DOB);
        const files = req.files;
        const uploadedImage  =await Promise.all(
            files.map(async (file) => {
              const result = await uploadUserImageToCloudinary(file.path);
              return result;
            })
          );

        if(uploadedImage.length==0){
            return res.status(400).send({success:false,message: 'Error in image upload'});
        }

        const user = new User({
           name:req.body.name,
           age:age,
           account:req.body.account,
          address: req.body.address,
           contact:req.body.contact,
           DOB:req.body.DOB,
           image:uploadedImage[0],
           role:req.body.role,
        });
        console.log(user);

        res.send({success:true,message:"user created successfully",data:user});
  
    } catch (error) {
        console.log("error in user post"+error.trace);
     next(error);   
    }
});

router.delete('/:id',verifyAccessToken, async(req,res,next)=>{
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

router.put('/:id',verifyAccessToken,async(req,res,next)=>{
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
        res.status(200).send({ success: true, message: "User updated Successfully", data: user });
    } catch (error) {
        next(error);
    }
});
router.get('/count', verifyAccessToken,async (req, res,next) =>{
    try {
        
        const userCount = await User.countDocuments((count) => count)
    
        if(!userCount) {
            throw createError[400]("no user exists");
        } 
        res.send({success:true,
            data: userCount,message:"user count found"
        });
    } catch (error) {
        next(error);
    }
});

module.exports=router;

