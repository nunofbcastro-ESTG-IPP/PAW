var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var User = require('../../models/user');
const userValidations = require('../../validations/user-validations');

const saltRounds = 10;

var userController = {};

userController.updateUser = function (req, res, next) {
  const { name, email, password, phoneNumber, address, dateOfBirthday } =
    req.body;

  const validations = {};

  validations.name = userValidations.validateName(name);
  validations.email = userValidations.validateEmail(email);
  validations.password = userValidations.validatePassword(password);
  validations.phoneNumber = userValidations.validateNumberPhone(phoneNumber);
  validations.address = userValidations.validateAddress(address);
  validations.dateOfBirthday =
    userValidations.validateDateBirth(dateOfBirthday);

  if (
    validations.name != null ||
    validations.email != null ||
    (password != null && validations.password.length > 0) ||
    (phoneNumber != null && validations.phoneNumber != null) ||
    (address != null && validations.address != null) ||
    validations.dateOfBirthday != null
  ) {
    validations.dataBase = false;
    return res.status(500).send(JSON.stringify(validations));
  }

  let user = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirthday: dateOfBirthday,
  };

  if (password != null) {
    user.password = bcrypt.hashSync(password, saltRounds);
  }

  if (phoneNumber != null) {
    user.phoneNumber = phoneNumber;
  }

  if (address != null) {
    user.address = address;
  }

  User.findByIdAndUpdate(req.userId, user, { new: true }, function (err, user) {
    if (err) {
      validations.dataBase = false;
      return res.status(500).send(JSON.stringify(validations));
    } else {
      res.json(user);
    }
  });
};

userController.getUser = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    if (err)
      return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    return res.send({ user: user });
  });
};

module.exports = userController;
