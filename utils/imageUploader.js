const {uploads}=require('../utils/cloudinary');
const cloudinary = require('cloudinary').v2;
const uploadImage =async function uploadImageToCloudinary(file) {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path);
    console.log('Image uploaded to Cloudinary:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message);
    throw error;
  }
}
module.exports=uploadImage;

