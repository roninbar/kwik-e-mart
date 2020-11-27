const ProductCategory = require('../models/ProductCategory');
const { Router } = require('express');

const router = new Router();

router.post('/', async function ({ originalUrl, body: { name } }, res) {
    const category = new ProductCategory({ name });
    try {
        const { _id } = await category.save();
        return res.location(`${originalUrl}/${_id}`).sendStatus(201);
    } catch ({ code }) {
        return res.sendStatus(code === 11000 ? 409 : 500);
    }
});

module.exports = router;
