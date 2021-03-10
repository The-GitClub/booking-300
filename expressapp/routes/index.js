const db = require("../models");
const router = require("express").Router();
const bookingcontroller = require("../controllers/bookingcontroller");



router.route("/").post(bookingcontroller.create);
router.route("/getAll").get(bookingcontroller.findAll);
router.route("/").get(bookingcontroller.findAll);
// router.route("/:id").delete(bookingcontroller.remove);
router.route("/:id").get(bookingcontroller.findOne);
//router.route("/:id").get(bookingcontroller.findOneAndUpdate);
router.route("/:id").put(bookingcontroller.updateBooking);
router.route("/:id").delete(bookingcontroller.deleteBooking);
module.exports = router;