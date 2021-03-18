const router = require("express").Router();
const restaurantControllers = require("../controllers/restaurantcontroller");
const checkAuth = require("../utils/check-auth");
const { checkRole } = require("../utils/authentication");

router.route("/:id").get(checkAuth, restaurantControllers.findOne);
router.route("/").get(checkAuth, restaurantControllers.findAll);
router.route("/").post(checkAuth, checkRole(["manager"]), restaurantControllers.create);
router.route("/:id").put(checkAuth, checkRole(["manager"]), restaurantControllers.updateRestaurant);


module.exports = router;