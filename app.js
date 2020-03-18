const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
require('dotenv/config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const publicationRouter = require('./routes/publications');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/publications', publicationRouter);
app.use('/', authRouter);

//connection to the database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
    ()=> console.log('Connected to DB')
);


module.exports = app;