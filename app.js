const express = require('express');
const createHttpError = require('http-errors');

const modulesRoute = require('./routes/modules');

const app = express();
app.use(express.json()); // to process JSON in request body


app.use(express.static('public'));

app.use('/modules', modulesRoute);

app.use(function (req, res, next) {
    return next(createHttpError(404, `Unknown Resource ${req.method} ${req.originalUrl}`));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({ error: err.message || 'Unknown Server Error!' });
});

module.exports = app;
