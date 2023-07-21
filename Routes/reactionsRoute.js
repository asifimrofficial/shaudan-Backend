const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Reaction = require('../Models/Reaction.model');

router.get('/',verifyAccessToken, async (req, res, next) => {
    try {
        const result = await Reaction.find();
        if (!result) throw createError.NotFound();
        res.send(result);
    } catch (error) {
        next(error);
    }
}   
);

router.get('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const result = await Reaction.findById(req.params.id);
        if (!result) throw createError.NotFound();
        res.send(result);
    } catch (error) {
        next(error);
    }
}
);

router.post('/',verifyAccessToken, async (req, res, next) => {
    try {
        const reaction = new Reaction(
            {
                like: req.body.like,
                dislike: req.body.dislike,
                reactions: req.body.reactions,

            }
        );
        const result = await reaction.save();
        if (!result) throw createError.InternalServerError();
        res.send(result);
    } catch (error) {
        next(error);
    }
});
router.put('/:id',verifyAccessToken, async (req, res, next) => {
    try {
        const result = await Reaction.findByIdAndUpdate(
            req.params.id,
            {
                like: req.body.like,
                dislike: req.body.dislike,
                reactions: req.body.reactions,
                
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
        const result = await Reaction.findByIdAndDelete(req.params.id);
        if (!result) throw createError.NotFound();
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;