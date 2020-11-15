const ProductCategory = require('../models/ProductCategory');
const Product = require('../models/Product');
const express = require('express');

const router = new express.Router();

router.post('/', async function ({ body: { name, category, price, image } }, res) {
    const product = new Product({
        name,
        price,
        image,
    });
    const { _id } = await product.save();
    const updateResult = await ProductCategory.findOneAndUpdate({ name: category }, { $push: { products: product } });
    return res.set('Location', `/api/product/${_id}`).sendStatus(201);
});

module.exports = router;
