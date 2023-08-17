const express = require('express');
const router = express.Router();

const Retailer = require('../Models/Retailer.model');
const { verifyAccessToken } = require('../Helpers/jwtHelper');
// Get all retailers
router.get('/:id', verifyAccessToken,async (req, res,next) => {
    try {
        const retailer = await Retailer.findOne({user:req.params.id});
        res.status(200).send({message: "Retailers found",success:true, data: retailer});
    } catch (err) {
        next(err)
    }
});

router.post('/', verifyAccessToken,async (req, res,next) => {
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