const express = require("express");
const router = express.Router();

const authentication = require("../../controllers/backOffice/AuthenticationController.js");

router.get("/login", authentication.verifyToken, authentication.loginGet);

router.post("/login", authentication.verifyToken, authentication.loginPost);

router.get("/signout", authentication.verifyToken, authentication.signout);

module.exports = router;
