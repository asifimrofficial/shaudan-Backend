const express= require('express');
const router = express.Router();

const Category = require('../Models/Category.model');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({message: "Categories found",succrss:true, data: categories});
    } catch (err) {
        next(err)
    }
}
);

router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    try {
        const savedCategory = await category.save();
        res.status(200).send({message: "Category Added Successfull",success:true, data: savedCategory});
    } catch (err) {
        next(err)
    }
}
);
