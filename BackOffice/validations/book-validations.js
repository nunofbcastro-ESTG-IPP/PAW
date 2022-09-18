const bookValidations = {};

bookValidations.validateIsbn = function (isbn) {
  let validation = new RegExp(/^[0-9]{13}$/);

  if (isbn == null || !validation.test(`${isbn}`)) {
    return 'Invalid isbn';
  }

  return null;
};

bookValidations.validateText = function (text, nameVariable) {
  if (text == null || text.length < 3) {
    return 'Invalid ' + nameVariable;
  }

  return null;
};

bookValidations.validatePrice = function (price) {
  if (price == '' || isNaN(price) || price < 0) {
    return 'Invalid price';
  }

  return null;
};

module.exports = bookValidations;
