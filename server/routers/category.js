const { Router } = require('express');
const ProductCategory = require('../models/ProductCategory');

const router = new Router();

/**
 * Create a new category.
 */
router.post('/', async function ({ originalUrl, body: { name } }, res) {
    const category = new ProductCategory({ name });
    try {
        const { _id } = await category.save();
        return res.set('Content-Location', `${originalUrl}/${_id}`).sendStatus(201);
    } 
    catch ({ code, message }) {
        return res.status(code === 11000 ? 409 : 500).send(message);
    }
});

/**
 * Get a list of all the categories.
 */
router.get('/all', async function (req, res) {
    const categories = await ProductCategory.find({}, '-products');
    return res.json(categories);
});

/**
 * Handle requests for products in this category.
 */
router.use(
    '/:categoryId/product',
    async function (req, res, next) {
        const { params: { categoryId } } = req;
        try {
            req.category = await ProductCategory.findById(categoryId);
            return req.category ? next() : res.sendStatus(404);
        }
        catch (err) {
            return res.sendStatus(err.kind === 'ObjectId' ? 400 : 500);
        }
    },
    require('./product'),
);

module.exports = router;
