const { Router } = require('express');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const { allow } = require('../util/passport');
const { createResource } = require('./utils');

const router = new Router();

/**
 * @param {ProductCategory} category
 */
router.post('/', allow('admin'), async function ({ originalUrl, category: { _id: categoryId }, body: { name, price, imageUrl } }, res) {
    try {
        return await createResource(res, originalUrl, new Product({ name, price, imageUrl, categoryId }));
    }
    catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 400).send(message);
    }
});

router.put('/:productId', allow('admin'), async function ({ originalUrl, category: { _id: oldCategoryId }, params: { productId }, body: { _id, name, price, imageUrl, categoryId: newCategoryId } }, res) {
    if (productId !== _id) {
        return res.sendStatus(400);
    }
    try {
        const product = await Product.findOne({ _id: productId, categoryId: oldCategoryId });
        if (product) {
            product.overwrite({ name, price, imageUrl, categoryId: newCategoryId });
            await product.save()
            return res.set('Content-Location', originalUrl.replace(oldCategoryId, newCategoryId)).json(product);
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch ({ message }) {
        return res.status(400).send(message);
    }
});

/**
 * @param {ProductCategory} category
 */
router.get('/all', allow('admin', 'user'), async function ({ category }, res) {
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

router.get('/:id', allow('admin', 'user'), async function ({ category: { _id: categoryId }, params: { id: productId } }, res) {
    const product = await Product.findOne({ _id: productId, categoryId });
    return product ? res.json(product) : res.sendStatus(404);
});

module.exports = router;

