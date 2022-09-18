const express = require("express");
const router = express.Router();

const home = require("../../controllers/backOffice/HomeController");
const authentication = require("../../controllers/backOffice/AuthenticationController.js");

/* GET home page. */
router.get("/", authentication.verifyToken, home.home);

module.exports = router;
