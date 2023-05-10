const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {

        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    addressType: {
        type: String,
        required: true,
    },
    location: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
});

module.exports = mongoose.model('Address', addressSchema);