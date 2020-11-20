const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const debug = require('debug');
const path = require('path');

const MONGODBURL = process.env['MONGODBURL'] || 'mongodb://localhost/shop';

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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/cart', require('./routers/cart'));
app.use('/api/user', require('./routers/user'));
app.use('/api/product', require('./routers/product'));
app.use('/api/category', require('./routers/category'));

module.exports = app;
