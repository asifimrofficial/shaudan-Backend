const {uploads}=require('../utils/cloudinary');

// module.exports=async(files)=>{
//    return await Promise.all(
//         files.map(async (err,file) => {
//           const result = await uploads(file.path);
//          // console.log("in image uploader "+result);
//           return result;
//         })
//       );
// }

async function uploadImage(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    console.log('Image uploaded:', result.url);
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

module.exports = uploadImage;