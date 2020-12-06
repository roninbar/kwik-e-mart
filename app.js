const cookieParser = require('cookie-parser');
const passport = require('./util/passport');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const debug = require('debug');
const path = require('path');
const { Router } = require('express');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODBURL = process.env['MONGODBURL'] || 'mongodb://localhost/shop';
const SECRET = process.env['SECRET'] || '';

debug('server:mongodb')(`Connecting to ${MONGODBURL}...`);
mongoose.connect(MONGODBURL, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoose.connection.on('error', debug('server:mongodb'));
mongoose.connection.on('open', () => debug('server:mongodb')('Connected.'));

const store = new MongoDBStore({
    uri: MONGODBURL,
    collection: 'sessions'
});

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    saveUninitialized: true,
    secret: SECRET,
    resave: false,
    store: store,
}));
app.use(passport.initialize());
app.use(passport.session());

const authRouter = new Router();

authRouter.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.json(req.user);
    }
);

authRouter.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.sendStatus(400);
        }
        req.logout();
        res.clearCookie('connect.sid').sendStatus(205);
    });
});

app.use('/api/auth', authRouter);
app.use('/api/user', require('./routers/user'));
app.use('/api/category', require('./routers/category'));

app.get(function (req, res, next) {
    return '' === path.extname(req.path) && 'html' === req.accepts('html', 'json', 'xml')
        ? res.sendFile(path.join(__dirname, 'public', 'index.html'))
        : next();
});

module.exports = app;
