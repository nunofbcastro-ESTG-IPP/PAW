const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../../jwt_secret/config');

const User = require('../../models/user');

var userValidations = require('../../validations/user-validations');

const saltRounds = 10;
const expiresIn = 86400;

var authController = {};

authController.login = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token, expiresIn: expiresIn });
  });
};

authController.register = function (req, res) {
  const { name, email, password, dateOfBirthday } = req.body;

  const validations = {};

  validations.name = userValidations.validateName(name);
  validations.email = userValidations.validateEmail(email);
  validations.password = userValidations.validatePassword(password);
  validations.dateOfBirthday =
    userValidations.validateDateBirth(dateOfBirthday);

  if (
    validations.name != null ||
    validations.email != null ||
    validations.password.length > 0 ||
    validations.dateOfBirthday != null
  ) {
    validations.dataBase = false;
    return res.status(500).send(JSON.stringify(validations));
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  User.create(
    {
      name: name,
      email: email,
      password: hashedPassword,
      dateOfBirthday: dateOfBirthday,
    },
    function (err, user) {
      if (err) {
        validations.dataBase = true;
        return res.status(500).send(JSON.stringify(validations));
      }
      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: expiresIn, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, expiresIn: 86400 });
    }
  );
};

authController.verifyToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

module.exports = authController;
