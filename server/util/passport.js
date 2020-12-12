const _ = require('lodash');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');

passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const user = await User.findOne({ username }, '+passwordHash');
        return done(null, user && user.validPassword(password) && user.set('passwordHash', undefined));
    }
    catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        done(null, await User.findById(id));
    } catch (err) {
        done(err);
    }
});

passport.guard = () => (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401);

module.exports = passport;

