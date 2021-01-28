const router = require("express").Router();
var User = require("../models/user");
const Booking = require("../models/booking");

// Bring in the User Registration Function, User Login Function
const {
  //userAuth,
  //userLogin,
  //checkRole,
  userRegister,
  //serializeUser
} = require("../utils/authentication");

// User Registration Route
router.post("/register-customer", async (req, res) => {
  await userRegister(req.body, "customer", res);
});

// Staff Registration Route
router.post("/register-staff", async (req, res) => {
  await (userRegister.body, "staff", res);
});

// Manager Admin Registration Route
router.post("/register-manager", async (req, res) => {
  await userRegister(req.body, "manager", res);
});

//EXPORT THESE METHODS TO THE UTILS FOLDER CUZ I CAN'T USE THE USER MODEL

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
