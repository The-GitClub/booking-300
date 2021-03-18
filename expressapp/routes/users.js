const router = require("express").Router();
var User = require("../models/user");
const Bookings = require("../models/booking");
const checkAuth = require("../utils/check-auth");

// Bring in the User Registration Function, User Login Function
const {
    userRegister,
    userLogin,
    checkRole
} = require("../utils/authentication");

/* #region  Registrations */
// Customer Registration Route
router.post("/register-customer", async (req, res) => {
  await userRegister(req.body, "customer", res);
});

// Staff Registration Route
router.post("/register-staff", checkAuth, checkRole(["staff"]), async (req, res) => {
  await userRegister(req.body, "staff", res);
});

// Manager  Registration Route
router.post("/register-manager", checkRole(["manager"]), async (req, res) => {
  await userRegister(req.body, "manager", res);
});

/* #endregion Registrations */

/* #region  Login */
  router.post("/login", async (req, res) => {
    try {
      await userLogin(req.body, res);
    }
    catch (err) {
      return res.status(501).json({
        message: `Login Failure. Account does not exist`,
        success: false,
      });
    }
  });
/* #endregion Login*/


// Get User Route 
router.get("/user", checkAuth, async (req, res) => {
  console.log("USER IN THE GET USER METHOD", req.user._id.id);
  let id = req.user._id.id;
  getUserBookings(id);
});


async function getUserBookings(req, res, next) {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("bookings");
  res.status(200).json(user.bookings);
}

async function newUserBooking(req, res, next) {
  const { userId } = req.params;
  // Create new booking
  const newBooking = new Bookings(req.body);
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
