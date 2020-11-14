const express = require('express');
const User = require('../models/User');

const router = new express.Router();

router.post('/', async function ({ body: { id, username, password, firstName, lastName, city, streetAddress } }, res) {
    const user = new User({
        id,
        role: 'user',
        username,
        password,
        name: {
            first: firstName,
            last: lastName,
        },
        address: {
            city,
        },
        streetAddress,
    });
    const { _id } = await user.save();
    return res.set('Location', `/api/user/${_id}`).sendStatus(201);
});

module.exports = router;
