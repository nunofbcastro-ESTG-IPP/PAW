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
  const roleInput = document.getElementById("role");

  const dateOfBirthday = new Date(dateOfBirthdayInput.value);

  hiddenError(nameInput);
  hiddenError(emailInput);
  hiddenError(addressInput);
  hiddenError(phoneNumberInput);
  hiddenError(dateOfBirthdayInput);
  hiddenError(roleInput);

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
  if (roleInput.value == "") {
    showError(roleInput);
    valid = false;
  }

  return valid;
}
