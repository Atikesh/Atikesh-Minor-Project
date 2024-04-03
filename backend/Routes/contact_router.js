const express = require("express");
const router =express.Router();
const contactForm = require("../Controller/contact_controller");

router.route("/contact").post(contactForm);


module.exports = router; 
