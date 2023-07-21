const multer = require('multer');
const path = require('path');
const fs= require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = './uploads/';
    
        if (req.baseUrl === '/products') {
          uploadPath += 'product/';
        } else if (req.baseUrl === '/users') {
          uploadPath += 'user/';
        } else {
          return cb(new Error('Invalid endpoint'));
        }
    
        fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder if it doesn't exist
        cb(null, uploadPath);
      },
    // destination: (req, file, cb) =>{
        
    //     // cb(null, '../uploads');
    // },
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
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null,'./uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString()+ file.originalname);
//     }   
    
// }
    
// );


// //file validation
// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
//         cb(null, true);
//     }else{
//         cb({message: 'Unsported file format'}, false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024*1024},
//         fileFilter: fileFilter
//     });

module.exports = upload;  
