var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restaurantRouter = require('./routes/restaurant');

var nodemailerRouter = require('./routes/nodemailer');
var cors= require('cors');
var app = express();

app.use(cors({
  // origin:['http://localhost:4200','http://127.0.0.1:4200'],
  origin:['http://project300.s3-website-eu-west-1.amazonaws.com'],
}));

var mongoose =require('mongoose');

/* #region connect to our MongoDB  */
const uri =
  "mongodb://S00190873:" + process.env.MONGO_ATLAS_PW + "@cluster0-shard-00-00.xf1uw.mongodb.net:27017,cluster0-shard-00-01.xf1uw.mongodb.net:27017,cluster0-shard-00-02.xf1uw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-127w60-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log(uri);
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
/* #endregion connect to our MongoDB*/
app.use(express.static("."));
app.use(express.json());

var passport = require("passport");
app.use(passport.initialize());
require("./passport")(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51IEHtSHNSX0dPtFXkCxt7oGHOwk9b0NEDbE48THVBbMjIevoY1PSYWB9JTM5v4OHf8Zj4F4jCb15d9giBDY1Pjme00RJX1qMm9");

app.use(express.static("."));
app.use(express.json());

app.post("/create-payment-intent", (req, res) => {
  stripe.paymentIntents.create(
    {
      amount: parseInt(req.body.amount),
      currency: "eur",
      payment_method_types: ["card"],
    },
    function (err, paymentIntent) {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.status(201).json(paymentIntent);
      }
    }
  );
});

app.use('/bookings', indexRouter);
app.use('/users', usersRouter);
app.use('/nodemailer', nodemailerRouter);
app.use('/restaurant', restaurantRouter);

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
