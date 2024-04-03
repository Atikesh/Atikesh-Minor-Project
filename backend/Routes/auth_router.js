const express = require("express");
const router = express.Router();
const authcontroller = require("../Controller/auth_controller");
const authMiddleware = require("../Middlewares/authMiddleware");
const validate = require("../Middlewares/validate_middleware");
const {signupSchema, loginSchema} = require("../Validations/auth_validate");


router.route("/").get(authcontroller.landingPage);
router.route("/signup").post(validate(signupSchema), authcontroller.signUp);
router.route("/login").post(validate(loginSchema),authcontroller.login);
router.route("/user").get(authMiddleware, authcontroller.user);

module.exports = router;