const ProductCategory = require('../models/productCategory');
const express = require('express');

const router = new express.Router();

router.post('/', async function ({ body: { name } }, res) {
    const category = new ProductCategory({ name });
    try {
        const { _id } = await category.save();
        return res.set('Location', `/api/category/${_id}`).sendStatus(201);
    } catch ({ code }) {
        return res.sendStatus(code === 11000 ? 409 : 500);
    }
});

module.exports = router;
