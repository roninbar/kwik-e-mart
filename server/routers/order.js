const debug = require('debug');
const { Router } = require('express');
const Order = require('../models/Order');
const passport = require('../util/passport');
const { createResource } = require('./utils');

const router = new Router();

router.post('/', passport.allow('user'), async function ({ originalUrl, body }, res) {
    debug('server:order')(body);
    const order = new Order(body);
    try {
        return createResource(originalUrl, order, res);
    } catch (err) {
        return res.sendStatus(500);
    }
});

module.exports = router;
