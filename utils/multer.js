const multer = require('multer');
const path = require('path');
const fs= require('fs');
const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
        

});
const upload = multer({
    
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png/;
        const extName = types.test(path.extname(file.originalname).toLowerCase());
        const mimeType = types.test(file.mimetype);
        if(extName && mimeType){
            cb(null, true);
        }else{
            cb({message: 'Unsupported file format'}, false);
        }
   }//
});

module.exports = upload;
  
