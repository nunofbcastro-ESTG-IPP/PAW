var express = require("express");
var router = express.Router();

var user = require("../../controllers/backOffice/UserController.js");
const authentication = require("../../controllers/backOffice/AuthenticationController.js");

router.get(
  "/register",
  authentication.verifyTokenEmployeeAdmin,
  user.registerGet
);

router.post(
  "/register",
  authentication.verifyTokenEmployeeAdmin,
  user.registerPost
);

router.get("/listUsers", authentication.verifyTokenEmployeeAdmin, user.list);

router.get("/edit/:id", authentication.verifyTokenEmployeeAdmin, user.edit);

// Edit update
router.post(
  "/update/:id",
  authentication.verifyTokenEmployeeAdmin,
  user.update
);

//Delete user
router.post(
  "/delete/:id",
  authentication.verifyTokenEmployeeAdmin,
  user.delete
);

// Search data
router.get("/search", authentication.verifyTokenEmployeeAdmin, user.search);

router.get("/profile", authentication.verifyToken, user.profileGet);

router.post("/profile", authentication.verifyToken, user.profilePost);

module.exports = router;
