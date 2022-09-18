const passwordValidator = require('password-validator');
const validator = require('validator');

const userValidations = {};

userValidations.validateName = function (name) {
  let validationStringNumber = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/
  );
  let validationNumber = new RegExp(/^[0-9]+$/);

  if (name == null || name.length < 3) {
    return 'Very short name';
  }

  if (
    validationStringNumber.test(`${name}`) ||
    validationNumber.test(`${name}`)
  ) {
    return 'Invalid name';
  }
  return null;
};

userValidations.validateEmail = function (email) {
  if (email == null || !validator.isEmail(email)) {
    return 'Invalid email';
  }
  return null;
};

function addRestrictionsPassword(validatorPassword) {
  validatorPassword
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(50) // Maximum length 50
    .has()
    .uppercase(1) // Must have uppercase letters
    .has()
    .lowercase(1) // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols(1) // Must have at least 2 symbols
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .usingPlugin(validator.isEmail, 'Password should be an email'); // Blacklist these values
}

userValidations.validatePassword = function (password) {
  let validatorPassword = new passwordValidator();
  addRestrictionsPassword(validatorPassword);
  return validatorPassword.validate(password, { details: true });
};

function age(birth) {
  let today = new Date();
  let diferencaAnos = today.getFullYear() - birth.getFullYear();

  if (
    new Date(today.getFullYear(), today.getMonth(), today.getDate()) <
    new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  ) {
    diferencaAnos--;
  }
  return diferencaAnos;
}

userValidations.validateDateBirth = function (date) {
  let birth = new Date(date);

  if (date == null || !(birth instanceof Date)) {
    return 'Invalid date';
  }

  let ageValue = age(birth);

  if (ageValue < 18) {
    return 'Must be at least 18 years old';
  }

  if (ageValue > 120) {
    return "Can't be more than 120 years old";
  }

  return null;
};

userValidations.validateNumberPhone = function (numberPhone) {
  let validation = new RegExp(/^9[1236]{1}[0-9]{7}$/);

  if (numberPhone == null || !validation.test(`${numberPhone}`)) {
    return 'Invalid number phone';
  }

  return null;
};

userValidations.validateAddress = function (address) {
  if (address == null || address.length < 3) {
    return 'Invalid address';
  }
  return null;
};

module.exports = userValidations;
