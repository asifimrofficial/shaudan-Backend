const mongoose= require("mongoose");
const priceSchema= new mongoose.Schema({
    price:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model('Price',priceSchema);