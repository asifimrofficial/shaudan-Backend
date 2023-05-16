const express = require('express');
const router = express.Router();
const Order = require('../Models/Order.model');
const createError = require('http-errors');

router.get('/', async (req, res, next) => {
    try {
        const orderList = await Order.findById(req.params.id);
        if (!orderList) { throw createError.NotFound('Orders not found') }
        res.status(200).send(orderList);
    } catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) { throw createError.NotFound('Order not found') }
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
       
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.address,
                billingAddressshippingAddress: req.body.address,
                contact : req.body.contact,
                
               socialMedia: req.body.socialMedia
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
router.put('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) { throw createError[400]('order not Deleted') }
        res.status(200).send({ success: true, message: "order deleted" });
    } catch (error) {
        next(error);
    }


});

module.exports = router;