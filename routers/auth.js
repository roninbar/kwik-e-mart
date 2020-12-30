const debug = require('debug');
const { Router } = require('express');
const passport = require('../util/passport');

const SIDNAME = process.env['SIDNAME'] || 'connect.sid';

const log = debug('server:auth');

const router = new Router();

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        return res.json(req.user);
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
