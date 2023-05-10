const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Reaction = require('../Models/Promotion.model');

router.get('/:id', async (req, res, next) => {
    try {
        const result = await Promotion.findByID(req.body.params);
        if (!result) throw createError.NotFound();
        res.send(result);
    } catch (error) {
        next(error);
    }
}
);

router.post('/', async (req, res, next) => {
    try {
        const promotion = new Promotion(
            {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                discount: req.body.discount,

            }
        );
        const result = await promotion.save();
        if (!result) throw createError.InternalServerError();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const result = await Promotion.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                discount: req.body.discount,
            },
            {
                new: true,
            }
        );
        if (!result) throw createError.NotFound();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Promotion.findByIdAndDelete(req.params.id);
        if (!result) throw createError.NotFound();
        res.send(result);
    } catch (error) {
        next(error);
    }
}
);

module.exports = router;