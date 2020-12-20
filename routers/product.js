const { Router } = require('express');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const { createResource } = require('./utils');

const router = new Router();

/**
 * @param {ProductCategory} category
 */
router.post('/', async function ({ originalUrl, category: { _id: categoryId }, body: { name, price, imageUrl } }, res) {
    const product = new Product({ name, price, imageUrl, categoryId });
    try {
        return await createResource(originalUrl, product, res);
    }
    catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 400).send(message);
    }
});

/**
 * @param {ProductCategory} category
 */
router.get('/all', async function ({ category }, res) {
    if (category === true) {
        // `true` means all the categories.
        const products = await Product.find();
        return res.json(products);
    }
    else if (category instanceof ProductCategory) {
        await category.populate('products').execPopulate();
        return res.json(category.products);
    }
    else {
        return res.sendStatus(500);
    }
});

router.get('/:id', async function ({ category: { _id: categoryId }, params: { id: productId } }, res) {
    const product = await Product.findOne({ _id: productId, categoryId });
    return product ? res.json(product) : res.sendStatus(404);
});

module.exports = router;

