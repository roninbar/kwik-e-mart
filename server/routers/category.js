const ProductCategory = require('../models/ProductCategory');
const Product = require('../models/Product');
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

const productRouter = new Router();

router.use(
    '/:categoryId/product',
    async function (req, res, next) {
        const { params: { categoryId } } = req;
        req.category = await ProductCategory.findById(categoryId);
        return req.category ? next() : res.sendStatus(404);
    },
    productRouter,
);

productRouter.post('/', async function ({ originalUrl, category, body: { name, price, imageUrl } }, res) {
    try {
        const product = new Product({ name, price, imageUrl });
        const { _id } = await product.save();
        await category.update({ $push: { products: product } });
        return res.set('Content-Location', `${originalUrl}/${_id}`).status(201).json(product);
    } catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 400).send(message);
    }
});

module.exports = router;
