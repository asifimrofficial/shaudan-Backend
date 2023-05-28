const express = require('express');
const router= express.Router();
const User= require('../Models/User.model');
const createError=require('http-errors')
const ageCalculator = require('../Helpers/ageCalculator');
const uploadImage=require('../utils/imageUploader');
const upload=require('../utils/multer');
const {uploads}=require('../utils/cloudinary');
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

router.post('/',/*upload.single('image')*/upload.array('image', 1),async(req,res,next)=>{
    try {

        if(!req.files){
            return res.status(400).send({message: 'Please upload a file'});
        }

        const age = ageCalculator(req.body.DOB);
        const files = req.files;
        console.log("loging files  "+files);
        // const uploadedImage  =await Promise.all(
        //     files.map(async (file) => {
        //       const result = await uploads(file.path);
        //       return result;
        //     })
        //   );

        const uploadedImages = await uploadImage(files);
        if(!uploadedImages){
            return res.status(400).send({message: 'Error in image upload'});
        }
        console.log("in uploadeded images   "+uploadedImages[0]);
        // console.log(req.body);
        const user = new User({
           name:req.body.name,
           age:age,
           account:req.body.account,
          // address: req.body.address,
           contact:req.body.contact,
           DOB:req.body.DOB,
           image:uploadedImages,
           role:req.body.role,
        });
        console.log(user);
        const savedUser= await user.save();
        if(!savedUser)
        {

            return res.status(400).send({message: 'Error in saving user'});
        }
        res.send(user);
  
    } catch (error) {
        console.log("error in user post"+error.trace);
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

