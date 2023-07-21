const express= require('express');
const router = express.Router();

const Category = require('../Models/Category.model');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({message: "Success", data: categories});
    } catch (err) {
        res.status(200).send({message: err, data: ""});
    }
}
);

router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    try {
        const savedCategory = await category.save();
        res.status(200).send({message: "Success", data: savedCategory});
    } catch (err) {
        res.status(200).send({message: err, data: ""});
    }
}
);
