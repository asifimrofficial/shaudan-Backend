const express = require('express');
const router= express.Router();
const User= require('../Models/User.model');
const Address= require('../Models/Adress.model');
const Contact= require('../Models/Contact.model');
const createError=require('http-errors')
const ageCalculator = require('../Helpers/ageCalculator');
const uploadImages=require('../utils/imageUploader');
const upload=require('../utils/multer');
const {verifyAccessToken, verfiyRefreshToken} = require('../Helpers/jwtHelper');

const {uploads,uploadUserImageToCloudinary}=require('../utils/cloudinary');
router.get('/:id',verifyAccessToken,async(req,res,next)=>{
    try {       
        const user= await User.findOne({account:req.params.id});
        if(!user)
        {
        throw createError.NotFound('user details not found');
        }
        res.send({success:true,data:user,message:"user details found"});
    } catch (error) {
     next(error);   
    }
});

router.post('/',verifyAccessToken,async(req,res,next)=>{
    try {
            const address = req.body.address;
            let userAddressId;
            let usercontact_id;
            if(address){
            const newAddress = new Address({
                street: address.street,
                houseNumber: address.houseNumber,
                city: address.city,
                postalCode: address.postalCode,
                state: address.state,
                country: address.country,
                addressType: address.addressType
              });
            const savedAddress= await newAddress.save();
            if(!savedAddress){res.send({success:false,message:"address not saved to database"})}
             userAddressId= savedAddress._id;
            }

            const contact = req.body.contact;
            if (contact){
            const UserContact = new Contact({
                phoneNumber: contact.phoneNumber,
               socialMedia: contact.socialMedia
            });
            
            const savedContact = await UserContact.save();
            if(!savedContact){res.send({success:false,message:"contact not saved to database"})}
            usercontact_id= savedContact._id;
        }
        const age=ageCalculator(req.body.DOB);
        const user = new User({
           name:req.body.name,
           age:age || null,
           account:req.body.account,
           address: userAddressId || null,
           contact:usercontact_id || null,
           DOB:req.body.DOB||null,
           role:req.body.role,
        });

        
        const savedUser= await user.save();

        res.send({success:true,message:"user created successfully",data:savedUser});
  
    } catch (error) {
        console.log("error in user post"+error.trace);
     next(error);   
    }
});
//write dummy json data for testing of above post api
// {
//     "name":"sana",
//     "age":23,
//     "account":"60f0a1b3e1b3a71f0c3f0b7f",
//     "address":{
//         "street":"street 1",
//         "houseNumber":"house 1",
//         "city":"city 1",
//         "postalCode":"postal 1",
//         "state":"state 1",
//         "country":"country 1",
//         "addressType":"addressType 1"
//     },
//     "contact":{
//         "phoneNumber":"phone 1",
//         "socialMedia":"social 1"
//     },
//     "DOB":"1998-12-12",
//     "image":"image 1",
//     "role":"role 1"
// }


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

router.post('/update/:id',verifyAccessToken,upload.array('image',1),async(req,res,next)=>{
    try {
        
        if(!req.files){
            next(createError[400]("Please upload an image"))
        }
        let uploadedImage;
        let age;
        const DOB=req.body.DOB;
        if(DOB){
        age = ageCalculator(req.body.DOB);
        }
        const files = req.files;
        if (files){
         uploadedImage  =await Promise.all(
            files.map(async (file) => {
              const result = await uploadUserImageToCloudinary(file.path);
              return result;
            })
          );

        if(uploadedImage.length==0){
            next(createError[400]("Error occur while saving Images"))
        }
        }
        const user= await User.findByIdAndUpdate(
            req.params.id,
            {
                name:req.body.name,
                age:age||user.age,
                address: userAddressId || null,
                contact:usercontact_id || null,
                DOB:req.body.DOB,
                role:req.body.role,   
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

