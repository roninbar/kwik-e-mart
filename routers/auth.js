const debug = require('debug')('server:auth');
const { Router } = require('express');
const passport = require('../util/passport');

const SIDNAME = process.env['SIDNAME'] || 'connect.sid';

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
            return res.sendStatus(500);
        }
        req.logout();
        return res.clearCookie(SIDNAME).sendStatus(205);
    });
});

module.exports = router;
