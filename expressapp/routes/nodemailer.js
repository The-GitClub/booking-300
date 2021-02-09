const router = require("express").Router();
const nodemailerControllers = require("../controllers/nodemailercontroller");

router.route("/").post(nodemailerControllers.handleEmail);
module.exports = router;