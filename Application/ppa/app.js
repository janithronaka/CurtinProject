var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

var router = require('./server/api/routes');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("server/images")));
app.use("/attachments", express.static(path.join("server/attachments")));
app.use(express.static(path.join(__dirname, 'dist/ppa')));
app.use('/', express.static(path.join(__dirname, 'dist/ppa')));


app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err);
    res.status(err.status || 500);
    res.send(err.status);
});

module.exports = app;