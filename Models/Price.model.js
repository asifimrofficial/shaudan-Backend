const mongoose= require("mongoose");
const priceSchema= new mongoose.Schema({
    price:{
        type:Number,
        // required:true
    },
    startDate:{
        type:Date,
        // required:true
    },
    endDate:{
        type:Date,
        // required:true
    },
},{timestamps:true});

module.exports=mongoose.model('Price',priceSchema);


// prodduct:
// {
//     "name": "string",
//     "category": "string",
//     "price": {
//         "price": 0,
//         "startDate": "2021-07-07T10:00:00.000Z",
//         "endDate": "2021-07-07T10:00:00.000Z",
//     }
// }