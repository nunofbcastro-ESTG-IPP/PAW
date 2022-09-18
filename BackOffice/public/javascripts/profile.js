const form = document.getElementById("form");
form.onsubmit = validateForm;

function validateEmail(email) {
  var validation = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return validation.test(email);
}

function validatePhoneNumber(numberPhone) {
  var validation = new RegExp(/^9[1236]{1}[0-9]{7}$/);
  return validation.test(numberPhone);
}

function validatePassword(password, minCharacters = 8, numberLowercases = 1, numberUppercases = 1, numberNumbers = 2, numberSpecialCharacters = 2) {
  var validation = new RegExp(`^(?=.{${numberLowercases},}[a-z])(?=.{${numberUppercases},}[A-Z])(?=.{${numberNumbers},}[0-9])(?=.{${numberSpecialCharacters},}[!@#$%^&*])(?=.{${minCharacters},})`);
  return validation.test(password);
}

function showError(input) {
  input.parentNode.lastElementChild.classList.remove("hidden");
}

function hiddenError(input) {
  input.parentNode.lastElementChild.classList.add("hidden");
}

function validateForm() {
  let valid = true;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const dateOfBirthdayInput = document.getElementById("dateOfBirthday");
  const dateOfBirthday = new Date(dateOfBirthdayInput.value);
  const passwordInput = document.getElementById("password");

  hiddenError(nameInput);
  hiddenError(emailInput);
  hiddenError(addressInput);
  hiddenError(phoneNumberInput);
  hiddenError(dateOfBirthdayInput);
  hiddenError(passwordInput);

  if (nameInput.value.length < 3) {
    showError(nameInput);
    valid = false;
  }
  if (!validateEmail(emailInput.value)) {
    showError(emailInput);
    valid = false;
  }
  if (!validatePhoneNumber(phoneNumberInput.value)) {
    showError(phoneNumberInput);
    valid = false;
  }
  if (addressInput.value.length < 3) {
    showError(addressInput);
    valid = false;
  }
  if (!dateOfBirthday instanceof Date || isNaN(dateOfBirthday)) {
    showError(dateOfBirthdayInput);
    valid = false;
  }
  if (passwordInput.value != "" && !validPassword(passwordInput.value)) {
    showError(passwordInput);
    valid = false;
  }

  return valid;
}
