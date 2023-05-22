const {uploads}=require('../utils/cloudinary');

module.exports=async(files)=>{
   return await Promise.all(
        files.map(async (file) => {
          const result = await uploads(file.path);
          return result;
        })
      );
}