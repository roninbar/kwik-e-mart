const passport = require('../util/passport');
const { Router } = require('express');

const router = new Router();

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.json(req.user);
    }
);

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.sendStatus(400);
        }
        req.logout();
        res.clearCookie('connect.sid').sendStatus(205);
    });
});

module.exports = router;
