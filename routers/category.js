const ProductCategory = require('../models/ProductCategory');
const { Router } = require('express');

const router = new Router();

router.post('/', async function ({ originalUrl, body: { name } }, res) {
    const category = new ProductCategory({ name });
    try {
        const { _id } = await category.save();
        return res.set('Content-Location', `${originalUrl}/${_id}`).sendStatus(201);
    } catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 500).send(message);
    }
});

router.get('/all', async function (req, res) {
    const categories = await ProductCategory.find({});
    return res.json(categories);
});

router.use(
    '/:categoryId/product',
    async function (req, res, next) {
        const { params: { categoryId } } = req;
        req.category = await ProductCategory.findById(categoryId);
        return req.category ? next() : res.sendStatus(404);
    },
    require('./product'),
);

module.exports = router;
