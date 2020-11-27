const Product = require('../models/Product');
const { Router } = require('express');

const productRouter = new Router();

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

module.exports = productRouter;
