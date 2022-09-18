const form = document.getElementById("form");
const quantityInput = document.getElementById("quantity");
const conditionInput = document.getElementById("state");
const unitaryPriceInput = document.getElementById("unitaryPrice");
const quantityErrorLabel = document.getElementById("quantityError");
let newStatePrice = 0,
  oldStatePrice = 0;
let newStateStock = 0,
  oldStateStock = 0;

let validData = true;
quantityErrorLabel.hidden = true;

function getBookData(nStatePrice, oStatePrice, nStateStock, oStateStock) {
  newStatePrice = nStatePrice;
  oldStatePrice = oStatePrice;
  newStateStock = nStateStock;
  oldStateStock = oStateStock;
}

conditionInput.onchange = function () {
  getPriceByCondition(newStatePrice, oldStatePrice);
};

quantityInput.onchange = function () {
  validateStock(newStateStock, oldStateStock);
};

quantityErrorFromServer();
form.onsubmit = validateForm;

/*
 * Get the price of book depending on selected condition
 */
function getPriceByCondition(newStatePrice, oldStatePrice) {
  if (conditionInput.value == "new") {
    unitaryPriceInput.value = newStatePrice;
  } else {
    unitaryPriceInput.value = oldStatePrice;
  }

  validateStock(newStateStock, oldStateStock);
}

/*
 * Validate if the quantity required is greater than the actual stock.
 */
function validateStock(newStateStock, oldStateStock) {
  if (
    (conditionInput.value == "new" &&
      Number(quantityInput.value) > newStateStock) ||
    (conditionInput.value == "old" &&
      Number(quantityInput.value) > oldStateStock)
  ) {
    quantityErrorLabel.hidden = false;
    validData = false;
  } else {
    quantityErrorLabel.hidden = true;
    validData = true;
  }
}

/*
 * Verify if the form is valid
 */
function validateForm() {
  return validData;
}

/*
 * Displays error message if was received a message by server, meaning that quantity is greater than actual stock
 * and server noticed this
 */
function quantityErrorFromServer(quantityError) {
  if (quantityError == "true") {
    quantityErrorLabel.hidden = false;
    validData = false;
  }
}
