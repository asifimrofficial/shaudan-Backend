const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
        

});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    // fileFilter: (req, file, cb) => {
    //     const types = /jpeg|jpg|png|gif/;
    //     const extName = types.test(path.extname(file.originalname).toLowerCase());
    //     const mimeType = types.test(file.mimetype);
    //     if(extName && mimeType){
    //         cb(null, true);
    //     }else{
    //         cb({message: 'Unsupported file format'}, false);
    //     }
   // }//
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
