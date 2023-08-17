const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
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