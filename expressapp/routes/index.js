const db = require("../models");
const router = require("express").Router();
const bookingcontroller = require("../controllers/bookingcontroller");
const checkAuth = require("../utils/check-auth");



router.route("/").post(checkAuth, bookingcontroller.create);
router.route("/getAll").get(checkAuth, bookingcontroller.findAll);
router.route("/").get(checkAuth, bookingcontroller.findAll);
// router.route("/:id").delete(bookingcontroller.remove);
router.route("/:id").get(checkAuth, bookingcontroller.findOne);
//router.route("/:id").get(bookingcontroller.findOneAndUpdate);
router.route("/:id").put(checkAuth, bookingcontroller.updateBooking);
router.route("/:id").delete(checkAuth, bookingcontroller.deleteBooking);
module.exports = router;