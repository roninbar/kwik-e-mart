const gcDebugAgent = require('@google-cloud/debug-agent');
const { Storage } = require('@google-cloud/storage');
const mongoSession = require('connect-mongodb-session');
const cookieParser = require('cookie-parser');
const debug = require('debug');
const fs = require('fs/promises');
const express = require('express');
const session = require('express-session');
const { ServerApiVersion: { v1 } } = require('mongodb');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('./util/passport');
const { allow } = require('./util/passport');

gcDebugAgent.start({
    allowExpressions: true,
    capture: {
        maxProperties: 0, // 0 means unlimited.
        maxFrames: 100,
        maxExpandFrames: 100,
    },
    serviceContext: { enableCanary: false },
});

const MongoDBStore = mongoSession(session);

const ENVIRONMENT = process.env['ENVIRONMENT'] || 'production';
const MONGODBCERT = process.env['MONGODBCERT'];
const MONGODBURL = process.env['MONGODBURL'] || 'mongodb://localhost/kwik-e-mart';
const SIDNAME = process.env['SIDNAME'] || 'connect.sid';
const SECRET = process.env['SECRET_FOR_SESSION'] || '';

function trap(signal) {
    const log = debug('kwik-e-mart:lifecycle');
    log(`Trapping ${signal}...`);
    process.on(signal, log);
}

trap('SIGTERM');

global.staticFilesDir = path.join(__dirname, 'public', 'kwik-e-mart');

debug('kwik-e-mart:mongodb')(`Connecting to ${MONGODBURL}...`);
const connectionOptions = {
    serverApi: v1,
    sslKey: MONGODBCERT,
    sslCert: MONGODBCERT,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(MONGODBURL, connectionOptions);
mongoose.connection.on('error', debug('kwik-e-mart:mongodb'));
mongoose.connection.on('open', () => debug('kwik-e-mart:mongodb')('Connected.'));

const app = express();

app.use(logger(ENVIRONMENT.startsWith('dev') ? 'dev' : 'common'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    saveUninitialized: false,
    resave: false,
    name: SIDNAME,
    secret: SECRET,
    store: new MongoDBStore({
        uri: MONGODBURL,
        collection: 'sessions',
        connectionOptions,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/gs', allow('admin'), require('./routers/gs'));
app.use('/api/s3', allow('admin'), require('./routers/s3'));
app.use('/api/user', require('./routers/user'));
app.use('/api/auth', require('./routers/auth'));
app.use('/api/order', require('./routers/order'));
app.use('/api/category', require('./routers/category'));

app.use(express.static(global.staticFilesDir));

app.get(['/products/:file', '/receipts/:file'], async function ({ url, params: { file: filename } }, res, next) {
    try {
        await download(url);
        return res.sendFile(path.join(global.staticFilesDir, 'products', filename));
    }
    catch {
        return next();
    }
});

app.get('/*', function (req, res, next) {
    return '' === path.extname(req.path) && 'html' === req.accepts('html', 'json', 'xml')
        ? res.sendFile(path.join(global.staticFilesDir, 'index.html'))
        : next();
});

/**
 * 
 * @param {string} filename
 */
async function download(filename) {
    const storage = new Storage();
    const bucket = storage.bucket('kwik-e-mart');
    const bucketPath = path.join('.', filename).replace('\\', '/');
    const file = bucket.file(bucketPath);
    const destination = path.join(global.staticFilesDir, filename);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await file.download({ destination });
}

module.exports = app;

