const { Router } = require('express');
const Product = require('../models/Product');

const router = new Router();

/**
 * @param {ProductCategory} category
 */
router.post('/', async function ({ originalUrl, category, body: { name, price, imageUrl } }, res) {
    try {
        const product = new Product({ name, price, imageUrl });
        const { _id } = await product.save();
        await category.updateOne({ $push: { products: product } });
        return res.set('Content-Location', `${originalUrl}/${_id}`).status(201).json(product);
    } catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 400).send(message);
    }
});

router.get('/all', async function ({ category }, res) {
    await category.populate('products').execPopulate();
    return res.json(category.products);
});

module.exports = router;
