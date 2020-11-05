var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path');

var app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
