const {uploads}=require('../utils/cloudinary');
const cloudinary = require('cloudinary').v2;
// module.exports=async(files)=>{
//    return await Promise.all(
//         files.map(async (err,file) => {
//           const result = await uploads(file.path);
//          // console.log("in image uploader "+result);
//           return result;
//         })
//       );
// }
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
// async function uploadImage(file) {
//   try {
//     const result = await cloudinary.uploader.upload(file.path);
//     console.log('Image uploaded:', result.url);
//     return result;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// }

