const db = require("../models");
const router = require("express").Router();
const restaurantControllers = require("../controllers/restaurantcontroller");

router.route("/:id").get(restaurantControllers.findOne);
router.route("/").get(restaurantControllers.findAll);
router.route("/").post(restaurantControllers.create);
router.route("/:id").put(restaurantControllers.updateRestaurant);


module.exports = router;