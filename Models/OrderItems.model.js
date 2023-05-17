const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    quantity: {
        type: String,
        required: true,
    },
    Product: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
       // required: true,
    }
    
        
   

});

module.exports = mongoose.model('OrderItem', orderItemsSchema);