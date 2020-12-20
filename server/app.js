const cookieParser = require('cookie-parser');
const passport = require('./util/passport');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const debug = require('debug');
const path = require('path');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODBURL = process.env['MONGODBURL'] || 'mongodb://localhost/shop';
const SIDNAME = process.env['SIDNAME'] || 'connect.sid';
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

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    saveUninitialized: true,
    resave: false,
    name: SIDNAME,
    secret: SECRET,
    store: new MongoDBStore({
        uri: MONGODBURL,
        collection: 'sessions'
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', require('./routers/auth'));
app.use('/api/user', require('./routers/user'));
app.use('/api/category', passport.allow('user', 'admin'), require('./routers/category'));
app.use('/api/order', passport.allow('user'), function (req, _res, next) {
    debug('server:order')(req.body);
    return next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res, next) {
    return '' === path.extname(req.path) && 'html' === req.accepts('html', 'json', 'xml')
        ? res.sendFile(path.join(__dirname, 'public', 'index.html'))
        : next();
});

module.exports = app;

