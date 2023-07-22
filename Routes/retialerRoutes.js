const express = require('express');
const router = express.Router();

const Retailer = require('../Models/Retailer.model');
const { verifyAccessToken } = require('../Helpers/jwtHelper');
// Get all retailers
router.get('/', verifyAccessToken,async (req, res) => {
    try {
        const retailers = await Retailer.find();
        res.status(200).send({message: "Retailers found",success:true, data: retailers});
    } catch (err) {
        next(err)
    }
});

router.post('/', verifyAccessToken,async (req, res) => {
    const retailer = new Retailer({
        user: req.body.user
    });
    try {
        const savedRetailer = await retailer.save();
        res.status(200).send({message: "Retailer Added Successfull",success:true, data: savedRetailer});
    } catch (err) {
        next(err)
    }
});

module.exports = router;