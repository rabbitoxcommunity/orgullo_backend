var createError = require('http-errors');
var express = require('express');
var dotenv = require('dotenv');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');

var app = express();
dotenv.config()

//connect database 
const connectDB = require('./utils/db')
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: "100mb" })); 
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const whitelist = JSON.parse(process.env.WHITE_LIST ?? "[]")

const corsOptions = {
  origin: function (origin, callback) {
      console.log("Request Origin:", origin);
      if (!origin || whitelist.includes(origin)) {
          callback(null, true);
      } else {
          console.error("Blocked by CORS:", origin);
          callback(new Error("Not allowed by CORS"));
      }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
