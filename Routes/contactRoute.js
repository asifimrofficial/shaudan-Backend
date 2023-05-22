const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact.model');
const createError = require('http-errors');

router.get('/:id', async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) { throw createError.NotFound('Lontact not found') }
        res.status(200).send(contact);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body.phoneNumber);
        const doesExist = await Contact.findOne({ phoneNumber: req.body.phoneNumber })
        console.log(`${doesExist}`);
        if (doesExist) {
            throw createError.Conflict(`${req.body.phoneNumber} is already registered`)
        } else {
            const contact = new Contact({
                phoneNumber: req.body.phoneNumber,
               socialMedia: req.body.socialMedia
            });

            const savedContact = await contact.save();
            console.log(`${savedContact}`);
            if (!savedContact) { throw createError[400]("Contact not saved to database") }
            res.status(200).send(savedContact);
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                phoneNumber: req.body.phoneNumber,
                socialMedia: req.body.socialMedia
            },
            { new: true }
        );
        if (!contact) { throw createError.NotFound('contact not found') }
        res.status(200).send(contact);


    } catch (error) {
        next(error);
    }


});
router.delete('/:id', async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) { throw createError[400]('contact not Deleted') }
        res.status(200).send({ success: true, message: "contact deleted" });
    } catch (error) {
        next(error);
    }


});

module.exports = router;