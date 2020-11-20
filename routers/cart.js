const Cart = require('../models/Cart');
const express = require('express');
const User = require('../models/User');

const router = new express.Router();

router.post('/', async function ({ body: { customer: username } }, res) {
    const customer = await User.findOne({ username });
    if (customer) {
        const cart = new Cart({ customer });
        try {
            const { _id } = await cart.save();
            return res.location(`/api/cart/${_id}`).sendStatus(201);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    else {
        return res.sendStatus(404);
    }
});

module.exports = router;
