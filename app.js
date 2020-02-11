const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');


//database configuration
const db = require('./config/database');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const educationRouter = require('./routes/education_dashboard');
const booksRouter = require('./routes/books');

const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(db.mongoURI, {
  // useMongoClient: true, no longer needed in Mongoose 5.x
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'cooldash',
  saveUninitialized: false,
  resave: false,
  cookie: { secure: true }
}))
app.use(flash());


//use routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboardRouter);
app.use('/education', educationRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.locals.user = req.user || null;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
