const express = require("express");

const router = express.Router();
const Cart = require("../Models/Cart.model");
const {
  verifyAccessToken,
  verfiyRefreshToken,
} = require("../Helpers/jwtHelper");

//add a list of cart items to the cart
//if cart is empty then just add the cart items
//if cart is not empty then check if the product is already in the cart or not
//if product is already in the cart then just update the quantity of the product in the cart
//if product is not in the cart then add the product to the cart
router.post("/add", verifyAccessToken, async (req, res, next) => {
  try {
    const cart = await Cart.find({ user: req.body.user });
    const existingProduct = await Cart.findOne({ product: req.body.product });
    if (existingProduct) {
      const populatedProductItem = await existingProduct.populate("product");

      if (populatedProductItem.product.quantity) {
        const updatedProduct = await Cart.findByIdAndUpdate(
          existingProduct._id,
          { quantity: existingProduct.quantity + 1 }
        ).populate("product");
        res.status(200).send({
          message: "Cart Added Successfull",
          success: true,
          data: updatedProduct,
        });
      }
    } else {
      const cartItem = new Cart({
        user: req.body.user,
        product: req.body.product,
        quantity: req.body.quantity,
      });
      const populatedProductItem = await cartItem.populate("product");
      // res.send(populatedCartItem);
      try {
        const savedCart = await cartItem.save();
        if (savedCart) {
          res.status(200).send({
            message: "Cart Added Successfull",
            success: true,
            data: savedCart,
          });
        } else {
          res
            .status(500)
            .send({ message: "Cart not Added", success: false, data: "" });
        }
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});
// url: http://localhost:5000/cart/add
// Body of /add is
// {
//     "user": "60b9b0b9e1b9a71e3c9e1b9a",
//     "product": "60b9b0b9e1b9a71e3c9e1b9a",
//     "quantity": 1
// }
router.get(
  "/get_total_amount_selected/:id",
  verifyAccessToken,
  async (req, res) => {
    try {
      const cart = await Cart.find({
        user: req.params.id,
        isProductSelectedBool: true,
      }).populate("product");
      let total = 0;
      // res.send(cart)
      cart.map((item) => {
        total += item.product.price * item.quantity;
      });
      res
        .status(200)
        .send({ message: "Cart total", success: true, data: total });
    } catch (err) {
      res.status(500).send({ message: err.message, success: false });
    }
  }
);
//url: http://localhost:5000/cart/get_total_amount_selected/60b9b0b9e1b9a71e3c9e1b9a
// output: {
//     "message": "Cart total",
//     "success": true,
//     "data": 100
// }

//get all cart items of a user
router.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.params.id }).populate("product");
    if (cart)
      res
        .status(200)
        .send({ message: "Cart items", success: true, data: cart });
    else
      res
        .status(404)
        .send({ message: "Cart items not found", success: false, data: cart });
  } catch (err) {
    next(err);
  }
});

//delete a cart item
router.delete("/delete/:id", verifyAccessToken, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ message: "Cart item deleted", success: true, data: cart });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false });
  }
});

//update quantity of a cart item
router.patch("/update_quantity/:id", verifyAccessToken, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
      quantity: req.body.quantity,
    });
    res
      .status(200)
      .send({ message: "Cart item updated", success: true, data: cart });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false });
  }
});
// here id is the id of the cart item

// url: http://localhost:5000/cart/update_quantity/60b9b0b9e1b9a71e3c9e1b9a
// Body of /update_quantity is
// {
//     "quantity": 2
// }

//update isProductSelectedBool of a cart item
router.patch(
  "/update_isProductSelectedBool/:id",
  verifyAccessToken,
  async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, {
        isProductSelectedBool: req.body.isProductSelectedBool,
      });
      res
        .status(200)
        .send({ message: "Cart item updated", success: true, data: cart });
    } catch (err) {
      res.status(500).send({ message: err.message, success: false });
    }
  }
);
// url: http://localhost:5000/cart/update_isProductSelectedBool/60b9b0b9e1b9a71e3c9e1b9a
// Body of /update_isProductSelectedBool is
// {
//     "isProductSelectedBool": true
// }

// delete only selected items in cart  of a user where isProductSelectedBool is true
router.delete(
  "/delete_selected_items/:id",
  verifyAccessToken,
  async (req, res) => {
    try {
      const cart = await Cart.deleteMany({
        user: req.params.id,
        isProductSelectedBool: true,
      });
      res

        .status(200)
        .send({ message: "Cart items deleted", success: true, data: cart });
    } catch (err) {
      res.status(500).send({ message: err.message, success: false });
    }
  }
);

// url: http://localhost:5000/cart/delete_selected_items/60b9b0b9e1b9a71e3c9e1b9a

// update all item  to isProductSelectedBool to true
router.patch("/select_all_items/:id", verifyAccessToken, async (req, res) => {
  try {
    const cart = await Cart.updateMany(
      {
        user: req.params.id,
      },
      {
        isProductSelectedBool: req.body.isProductSelectedBool,
      }
    );
    res

      .status(200)
      .send({ message: "Cart item updated", success: true, data: cart });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false });
  }
});

// url: http://localhost:5000/cart/select_all_items/60b9b0b9e1b9a71e3c9e1b9a
// Body of /select_all_items is
// {
//     "isProductSelectedBool": true
// }

module.exports = router;
