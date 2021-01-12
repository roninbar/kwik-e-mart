const { Router } = require('express');
const { Types: { ObjectId } } = require('mongoose');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const { allow } = require('../util/passport');
const { storeImageFile } = require('./utils');

const router = new Router();

/**
 * @param {ProductCategory} category
 */
router.post('/', allow('admin'), async function ({ originalUrl, category: { _id: categoryId }, body: { name, price }, files: { image: imageFile } }, res) {
    const _id = new ObjectId();
    const imageUrl = await storeImageFile(_id, imageFile);
    try {
        const product = new Product({ _id, name, price, imageUrl, categoryId });
        await product.save();
        return res.status(201).set('Content-Location', `${originalUrl}/${_id}`).json(product);
    }
    catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 400).send(message);
    }
});

/**
 * @param {ProductCategory} category
 */
router.put('/:productId', allow('admin'), async function ({ originalUrl, category: { _id: oldCategoryId }, params: { productId }, body: { name, price, categoryId: newCategoryId }, files: { image: imageFile } }, res) {
    const imageUrl = await storeImageFile(productId, imageFile);
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

