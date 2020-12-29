const path = require('path');
const util = require('util');
const debug = require('debug');
const { Router } = require('express');
const Order = require('../models/Order');
const passport = require('../util/passport');
const { createResource } = require('./utils');

const log = debug('server:order');

const router = new Router();

router.post('/', passport.allow('user'), async function ({ originalUrl, user, body }, res) {
    log(util.inspect({ user, body }, { depth: 4, colors: true }));
    const order = new Order({ customer: user, ...body });
    try {
        return await createResource(originalUrl, order, res);
    } catch (e) {
        const errors = e.errors ? Object.values(e.errors) : [];
        const messages = errors.map(({ message }) => message).join('\n');
        return res.status(e.errors ? 400 : 500).send(messages);
    }
});

router.get('/all', async function (req, res) {
    const orders = await Order.find();
    return res.json(orders);
});

router.get('/:id', async function ({ params: { id } }, res) {
    const order = await Order.findById(id);
    return order ? res.json(order) : res.sendStatus(404);
})

module.exports = router;

