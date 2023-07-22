const express = require('express');
const router = express.Router();


const WholeSaler = require('../Models/WholeSaler.model');
const { verifyAccessToken } = require('../Helpers/jwtHelper');
// Get all wholeSalers
router.get('/',verifyAccessToken, async (req, res) => {
    try {
        const wholeSalers = await WholeSaler.find();
        res.status(200).send({message: "WholeSalers found",success:true, data: wholeSalers});
    } catch (err) {
        next(err)
    }
}
);

router.post('/', verifyAccessToken,async (req, res) => {
    const wholeSaler = new WholeSaler({
        user: req.body.user,
        store: req.body.store
    });
    try {
        const savedWholeSaler = await wholeSaler.save();
        res.status(200).send({message: "WholeSaler Added Successfull",success:true, data: savedWholeSaler});
    } catch (err) {
        next(err)
    }
});

module.exports = router;
