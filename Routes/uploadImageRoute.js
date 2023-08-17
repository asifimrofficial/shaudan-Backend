const express= require('express');
const router = express.Router();
const upload=require('../utils/multer');
const {deleteProductImages,uploads}=require('../utils/cloudinary');
router.post('/images', upload.array("image",10),async (req, res) => {

    const files = req.files;
    console.log(files);
    if (!files || files.length === 0) {
        return res.status(400).send({ success: false, message: 'No images uploaded',data:'' });
    }
    const uploadedImages =await Promise.all(
        files.map(async (file) => {
          const result = await uploads(file.path);
          return result;
        })
      );
      console.log(uploadedImages[0]);
      if(!uploadedImages){
        return res.status(400).send({ success: false,message: 'Error in image upload',data:''});
      }
        
    res.status(200).send({ success: true ,message:"Images uploaded successfully",data:uploadedImages});
});
router.post('/image', upload.single("image"),async (req, res) => {

    const file = req.file;
    console.log(file);
    if (!file) {
        return res.status(400).send({  success: false,message: 'No images uploaded',data:'' });
    }
    const uploadedImage = await uploads(file.path);
    console.log(uploadedImage);
      if(!uploadedImage){
        return res.status(400).send({ success: false,message: 'Error in image upload',data:''});
      }
        
    res.status(200).send({ success: true,message:"Images uploaded successfully",data:uploadedImage});
});

module.exports = router;