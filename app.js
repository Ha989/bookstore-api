require('dotenv').config();
const cors = require("cors");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use((req,res,next) => {
    const exception = new Error(`Path not found`);
    exception.statusCode = 404;
    next(exception);
});
app.use((err,req, res, next) => {
    res.status(err.statusCode).send(err.message);
});


module.exports = app;
