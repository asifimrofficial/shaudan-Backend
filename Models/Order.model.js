const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
       // required: true,
    }],
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    billingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    retailer:{  
        type:mongoose.Schema.Types.ObjectId,
        ref:"Retailer",
       // required:true
    },

    contact:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contact",
       // required:true
    },
    totalAmmount:{
        type:Number,
      //  required:true,
        default:0
    },
    paymentMethod:{
        type:String,
     //   required:true,
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
    
        
    

}
, {timestamps: true});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model('Order', orderSchema);