const mongoose = require("mongoose");

// cart should have isProductSelectedBool , quantity, product, user

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isProductSelectedBool: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
