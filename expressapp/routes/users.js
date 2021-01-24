var express = require("express");
var router = express.Router();
var User = require("../models/user");
const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");

var passport = require("passport");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* #region  REGISTER */
  router.post("/register", async (req, res, next) => {
    // Store the user as a variable for easier use from the JSON request
      var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creation_dt: Date.now(),
      });

  console.dir(user);
  console.log("START OF METHOD");

    // Validate username call
      const validateUsername = async (username) => {
        let user = await User.findOne({ username });
        return user ? false : true;
      };

     // ValidateEmail call
      const validateEmail = async (email) => {
        let user = await User.findOne({ email });
        return user ? false : true;
      };

    // Validate the username method
      let usernameNotTaken = await validateUsername(user.username);
      console.log("USERNAME AVAILABLE: " + usernameNotTaken);
      if (!usernameNotTaken) {
        // not-not-taken means it is taken because it is a double negative
        return res.status(501).json({
          //bad request
          message: `Username unavailable.`,
          success: false,
        });
      }

    // Validate the email method
      let emailNotRegistered = await validateEmail(user.email);
      console.log("EMAIL AVAILABLE: " + emailNotRegistered);
      if (!emailNotRegistered) {
        return res.status(501).json({
          message: `This email is already associated with a registered account.`,
          success: false,
        });
      }
      

    // Adding to database call
      await addToDB(user, res);
  });
/* #endregion Register*/

// Adding to database function
  async function addToDB(user, res) {
    try {
      doc = await user.save();
      return res.status(201).json({
        message: `Account Created.`,
        success: true,
      });

    } catch (err) {
      res.json();
      return res.status(501).json({
        message: `Account Creation Failure.`,
        success: false,
      });
    }
  }

/* #region  LOGIN */
  router.post('/login',function(req,res,next){

    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        return res.status(501).json({
          message: `Login Failure.`,
          success: false,
        }); 
      }
      if (!user) { 
        return res.status(501).json({
          message: `Username Or Password Incorrect.`,
          success: false,
        }); 
      }
      req.logIn(user, function(err) {
        console.dir(user);
        if (err) { 
          console.log("FUCK");
          return res.status(501).json(err); 
        }
        return res.status(200).json({
          message: `You are now logged in.`,
          success: true,
        });
      });
    })(req, res, next);
  });
/* #endregion LOGIN */

router.get("/user", isValidUser, function (req, res, next) {
  return res.status(200).json(req.user);
});

router.get("/logout", isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: "Logout Success" });
});

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: "Unauthorized Request" });
}

// Associating user with booking
async function getUserBookings(req, res, next) {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("bookings");
  console.log("user's bookings", user.bookings);
  res.status(200).json(user.bookings);
}

async function newUserBooking(req, res, next) {
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
  } catch (err) {
    return res.status(501).json(err);
  }
}

router.route("/:userId/bookings").get(getUserBookings).post(newUserBooking);

module.exports = router;
