const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')


require('dotenv/config');

// const path = require('path');
// const jwt = require('jsonwebtoken');

const helmet = require('helmet');

const usersRouter = require('./routes/users');
const signalRouter = require('./routes/signal');
const publicationRouter = require('./routes/publications');
const loginRouter = require('./routes/login');
const commentRouter = require('./routes/comments');
const catRouter = require('./routes/category');

const authMiddleware = require('./middleware/auth');

const app = express();

app.use(helmet());

app.use(logger('dev')); // Todo : remove in prod

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(authMiddleware);

app.use(loginRouter);
app.use('/category', catRouter);
app.use('/comment', commentRouter);
app.use('/users', usersRouter);
app.use('/signal', signalRouter);
app.use('/publications', publicationRouter);

app.use((rep, res) => {
	res.status(404).json({error: "route does not exist"})
});

//initialize the connection to the database
mongoose.connect(
	process.env.DB_CONNECTION,
	{useNewUrlParser: true, useUnifiedTopology: true},
	() => console.log('Connected to DB')
);


module.exports = app;
