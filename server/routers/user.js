const User = require('../models/User');
const { Router } = require('express');

const router = new Router();

router.post('/', async function ({ body: { id: _id, username, password, firstName, lastName, city, streetAddress } }, res) {
    const user = new User({ _id, role: 'user', username, password, firstName, lastName, city, streetAddress });
    await user.save();
    return res.location(`/api/user/${_id}`).sendStatus(201);
});

module.exports = router;
