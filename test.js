// 
const bcrypt = require('bcrypt');


const salt=bcrypt.genSaltSync(10);
var hashedpassword;
const hashPassword=async(password)=>{
     bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("hi iam   "+hash);
            hashedpassword=hash;
            console.log("in hasehdpassword   "+hashedpassword);
        }
     });
}

hashPassword("123456789");
const checkPassword=async(password)=>{
    console.log("in chehck password "+hashedpassword);
    bcrypt.compare(password,hashedpassword,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
}

checkPassword("123456789");