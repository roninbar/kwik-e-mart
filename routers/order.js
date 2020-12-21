const debug = require('debug');
const { Router } = require('express');
const Order = require('../models/Order');
const passport = require('../util/passport');
const { createResource } = require('./utils');

const router = new Router();

router.post('/', passport.allow('user'), async function ({ originalUrl, user, body }, res) {
    debug('server:order')(body);
    const order = new Order({ customer: user, ...body });
    try {
        return await createResource(originalUrl, order, res);
    } catch ({ errors }) {
        const messages = Object.values(errors).map(({ message }) => message).join('\n');
        return res.status(errors ? 400 : 500).send(messages);
    }
});

module.exports = router;
