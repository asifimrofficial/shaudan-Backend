const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required: true,
    }],
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    billingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    
    contact:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contact",
        required:true
    },
    totalAmmount:{
        type:Number,
        required:true,
        default:0
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"Cash On Delivery"
    },
    deliveryCharges:
    {
        type:Number,
        default:0
    },
    orderStatus:
    {
        type:String,
        default:"Pending"
    },
    
        
   

});

module.exports = mongoose.model('Order', orderSchema);