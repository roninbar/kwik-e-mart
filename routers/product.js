const ProductCategory = require('../models/ProductCategory');
const Product = require('../models/Product');
const express = require('express');

const router = new express.Router();

router.post('/', async function ({ body: { name, category: categoryName, price, image } }, res) {
    const product = new Product({
        name,
        price,
        image,
    });
    try {
        const { _id } = await product.save();
        const category = await ProductCategory.findOneAndUpdate({ name: categoryName }, { $push: { products: product } });
        return res.location(`/api/product/${_id}`).sendStatus(201);
    } catch ({ message }) {
        return res.status(500).send(message);
    }
});

module.exports = router;
