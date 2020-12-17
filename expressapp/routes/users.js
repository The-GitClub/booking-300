var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Booking = require('../models/booking')

var passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}


router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

// Associating user with booking
async function getUserBookings (req, res, next) {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('bookings');
  console.log('user\'s bookings', user.bookings);
  res.status(200).json(user.bookings);
}

async function newUserBooking (req, res, next) {
  const { userId } = req.params;
  // Create new booking
  const newBooking = new Booking(req.body);
  // Get user
  const user = await User.findById(userId);
  // Assign booking to user
  newBooking.customer = user;
  // Save booking
  await newBooking.save();
  // Add booking to user array
  user.bookings.push(newBooking);
  // Save user
  try {
  await user.save();
  res.status(201).json(newBooking);
  }

  catch(err){
      return res.status(501).json(err);
  }
}

router.route('/:userId/bookings')
.get(getUserBookings)
.post(newUserBooking);

module.exports = router;
