require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB, {
    authSource: process.env.DB_AuthSource,
    user: process.env.DB_User,
    pass: process.env.DB_Password,
    useNewUrlParser: true,
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//? BackOffice routes declaration
var homeBackofficeRouter = require('./routes/backOffice/home');
var authenticationBackofficeRouter = require('./routes/backOffice/authentication');
var bookBackofficeRouter = require('./routes/backOffice/books');
var usersBackofficeRouter = require('./routes/backOffice/users');
var pointsBackofficeRouter = require('./routes/backOffice/points');

//? REST API routes declaration
var authApiRouter = require('./routes/api/auth');
var usersApiRouter = require('./routes/api/users');
var booksApiRouter = require('./routes/api/books');
var purchasesApiRouter = require('./routes/api/purchases');
var salesApiRouter = require('./routes/api/sales');
var subscriberApiRouter = require('./routes/api/subscriber');

var app = express();

app.use(cors());

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(
  '/flowbite/dist',
  express.static(__dirname + '/node_modules/flowbite/dist')
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//? BackOffice routes
app.use('/', homeBackofficeRouter);
app.use('/', authenticationBackofficeRouter);
app.use('/book', bookBackofficeRouter);
app.use('/users', usersBackofficeRouter);
app.use('/points', pointsBackofficeRouter);

//? API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', authApiRouter);
app.use('/api/v1/users', usersApiRouter);
app.use('/api/v1/books', booksApiRouter);
app.use('/api/v1/purchases', purchasesApiRouter);
app.use('/api/v1/sales', salesApiRouter);
app.use('/api/v1/subscriber', subscriberApiRouter);

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
  res.status(err.status || 500);
  res.render('error', { layout: false, title: err.status });
});

module.exports = app;
