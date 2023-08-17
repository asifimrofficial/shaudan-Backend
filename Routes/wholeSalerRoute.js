const express = require('express');
const router = express.Router();


const WholeSaler = require('../Models/WholeSaler');
const Store = require('../Models/Store.model');
const { verifyAccessToken } = require('../Helpers/jwtHelper');
// Get all wholeSalers
router.get('/:id',verifyAccessToken, async (req, res,next) => {
    try {
            const wholeSaler = await WholeSaler.findOne({user:req.params.id});
        res.status(200).send({message: "WholeSalers found",success:true, data: wholeSaler});
    } catch (err) {
        next(err)
    }
}
);

router.post('/', verifyAccessToken,async (req, res,next) => {
    const store=req.body.store;
    const newstore=new Store({
            name:store.name,
            about:store.about||null,
            address:store.address||null,
            coverPicture:store.coverPicture||null,
            logo:null,
            storeType:store.storeType||null,
            reviews:store.reviews||null,
            status:store.status||null,
            contact:store.contact||null
    });
    
    const saveStore= await newstore.save();
    if(!saveStore){throw createError[400]("store not saved to database")}


    const wholeSaler = new WholeSaler({
        user: req.body.user,
        store: saveStore._id
    });
    try {
        const savedWholeSaler = await wholeSaler.save();
        res.status(200).send({message: "WholeSaler Added Successfull",success:true, data: savedWholeSaler});
    } catch (err) {
        next(err)
    }
});

module.exports = router;
