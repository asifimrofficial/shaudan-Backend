const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    name:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true,
    },
    image:
    {
        type: String,
        required: true,
    },
    discount:
    {
        type: Number,
        required: true,
    }},);

const Promotion = mongoose.model('Promotion', promotionSchema);
