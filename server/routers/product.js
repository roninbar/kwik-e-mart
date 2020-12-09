const { Router } = require('express');
const Product = require('../models/Product');

const router = new Router();

/**
 * @param {ProductCategory} category
 */
router.post('/', async function ({ originalUrl, category: { _id: categoryId }, body: { name, price, imageUrl } }, res) {
    try {
        const product = new Product({ name, price, imageUrl, categoryId });
        const { _id } = await product.save();
        return res.set('Content-Location', `${originalUrl}/${_id}`).status(201).json(product);
    }
    catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 400).send(message);
    }
});

/**
 * @param {ProductCategory} category
 */
router.get('/all', async function ({ category }, res) {
    await category.populate('products').execPopulate();
    return res.json(category.products);
});

router.get('/:id', async function ({ category: { _id: categoryId }, params: { id: productId } }, res) {
    const product = await Product.findOne({ _id: productId, categoryId });
    return product ? res.json(product) : res.sendStatus(404);
});

module.exports = router;
