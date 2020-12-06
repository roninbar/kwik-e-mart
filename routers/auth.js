const jwt = require('jsonwebtoken');
const { Router } = require('express');
const User = require('../models/User');

const SECRET = process.env['SECRET'] || '';

const router = new Router();

router.post('/login', async function ({ body: { username, password } }, res) {
    const user = await User.findOne({ username }, '+passwordHash');
    const { _id: userId } = user;
    return user && user.verify(password)
    ? res.json({ token: jwt.sign({ userId, expires: Date.now() + 60000 }, SECRET) })
    : res.sendStatus(401);
});

router.post('/logout', function (req, res) {
});

module.exports = router;
