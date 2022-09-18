const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const config = require("../../jwt_secret/config");
const User = require("../../models/user");

const validatorEmail = require("email-validator");

const bcrypt = require("bcrypt");

var authenticationController = {};

authenticationController.loginGet = function (req, res) {
  if (typeof req.user != "undefined") {
    return res.redirect("/");
  }

  const { error } = req.query;
  res.render("../views/authentication/login", { title: "Login", error: error });
};

authenticationController.loginPost = function (req, res) {
  if (typeof req.user != "undefined") {
    return res.redirect("/");
  }

  const { email, password } = req.body;

  if (
    email == undefined ||
    !validatorEmail.validate(email) ||
    password == undefined
  ) {
    res.redirect("/login?error=Email or password is invalid");
    return;
  }

  User.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.redirect("/login?error=Email or password is invalid");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
      return res.redirect("/login?error=Email or password is invalid");

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    // return the information including token as JSON
    res.cookie("token", token);
    //res.status(200).send({ auth: true, token: token });
    res.redirect("/");
  });
};

authenticationController.signout = function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
};

authenticationController.verifyToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.cookies.token;
  if (!token) {
    //return res.redirect("/404"); //return res.status(403).send({ auth: false, message: "No token provided." });

    return next();
  }
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      //return res.status(500).send({ auth: false, message: "Failed to authenticate token." });

      return next();
    }
    // if everything is good, save to request for use in other routes

    User.findOne({ _id: decoded.id }, function (err, user) {
      if (err) return next();
      if (!user) return next();

      req.user = user;
      next();
    });
  });
};

authenticationController.verifyTokenEmployeeAdmin = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.cookies.token;
  if (!token) {
    //return res.redirect("/404"); //return res.status(403).send({ auth: false, message: "No token provided." });
    return next();
  }

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      //return res.status(500).send({ auth: false, message: "Failed to authenticate token." });

      return next();
    }
    // if everything is good, save to request for use in other routes

    User.findOne({ _id: decoded.id }, function (err, user) {
      if (err) return next();
      if (!user) return next();
      if (user.role !== "Employee" && user.role !== "Admin") return next();

      req.user = user;
      next();
    });
  });
};

authenticationController.verifyTokenAdmin = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.cookies.token;
  if (!token) {
    //return res.redirect("/404"); //return res.status(403).send({ auth: false, message: "No token provided." });
    return next();
  }

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      //return res.status(500).send({ auth: false, message: "Failed to authenticate token." });

      return next();
    }
    // if everything is good, save to request for use in other routes

    User.findOne({ _id: decoded.id }, function (err, user) {
      if (err) return next();
      if (!user) return next();
      if (user.role !== "Admin") return next();

      req.user = user;
      next();
    });
  });
};

module.exports = authenticationController;
