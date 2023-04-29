const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    socialMedia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialMedia',
        required: true,
    },

});

module.exports = mongoose.model('Contact', contactSchema);