const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SCERET
});

const uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({url: result.url, id: result.public_id})
        }, {
            resource_type: "auto",
            folder: "folder"})
    })
}

async function deleteProductImages(imageIds) {
    try {
      const deletionPromises = imageIds.map((imageId) => cloudinary.uploader.destroy(imageId));
      const deletionResults = await Promise.all(deletionPromises);
      console.log(deletionResults);
      return deletionResults;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete product images');
    }
  }

  module.exports = {deleteProductImages,uploads};
    
