var createError = require('http-errors');
var express = require('express');
var dotenv = require('dotenv');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');

var app = express();
dotenv.config();

// Connect to database 
const connectDB = require('./utils/db');
connectDB();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: "100mb" })); 
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const whitelist = JSON.parse(process.env.WHITE_LIST ?? "[]");

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

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// **Add this part to start the server**
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
