const express = require('express');
const router = express.Router();
const Order = require('../Models/Order.model');
const OrderItem = require('../Models/OrderItems.model');
const createError = require('http-errors');
const {verifyAccessToken, verfiyRefreshToken} = require('../Helpers/jwtHelper');
router.get('/',verfiyRefreshToken, async (req, res, next) => {
    try {
        const orderList = await Order.find();
        if (!orderList) { throw createError.NotFound('Orders not found') }
        res.status(200).send(orderList);
    } catch (error) {
        next(error);
    }
});
router.get('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('orderItems').populate('shippingAddress').populate('billingAddress').populate('retailer').populate('contact');
        if (!order) { throw createError.NotFound('Order not found') }
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
});

router.post('/',verifyAccessToken, async (req, res, next) => {
    try {
            const orderItems = Promise.all(req.body.orderItems.map(async (orderItem) => {
                const newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                }); 
                const savedOrderItem = await newOrderItem.save();
                console.log(`${savedOrderItem}`);
                if (!savedOrderItem) { throw createError[400]("OrderItem not saved to database") }
                return savedOrderItem._id;
            }));
                const orderItemsIdsResolved = await orderItems;

            const order = new Order({
                orderItems: orderItemsIdsResolved, 
                shippingAddress: req.body.address,
                billingAddress: req.body.address,
                contact : req.body.contact,
                totalAmmount: req.body.totalAmmount,
                paymentMethod: req.body.paymentMethod,
                orderStatus: req.body.orderStatus,
                deliveryCharges: req.body.deliveryCharges
            });

            const savedContact = await order.save();
            console.log(`${savedContact}`);
            if (!savedContact) { throw createError[400]("Order not saved to database") }
            res.status(200).send(savedContact);
        
    } catch (error) {
        console.log(error)
        next(error);
    }
});
router.put('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                phoneNumber: req.body.phoneNumber,
                socialMedia: req.body.socialMedia
            },
            { new: true }
        );
        if (!order) { throw createError.NotFound('order not found') }
        res.status(200).send(order);


    } catch (error) {
        next(error);
    }


});
router.delete('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) { throw createError[400]('order not Deleted') }
        res.status(200).send({ success: true, message: "order deleted" });
    } catch (error) {
        next(error);
    }


});

module.exports = router;

