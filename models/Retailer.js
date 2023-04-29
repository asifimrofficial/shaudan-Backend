const mongoose = require('mongoose');

const wholeSalerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    }
});

module.exports = mongoose.model('WholeSaler', wholeSalerSchema);