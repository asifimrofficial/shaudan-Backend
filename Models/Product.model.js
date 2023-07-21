const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    images: [
        {
            url: String,
            public_id: String
        }
    ],
    WholeSaler:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WholeSaler',
        required: true,
    },

    tags: [
          {
            type: String,
            required: true
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);