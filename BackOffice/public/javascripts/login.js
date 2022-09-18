const form = document.getElementById("form");
form.onsubmit = validate;

function validateEmail(email) {
  var validation = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return validation.test(email);
}

function validate() {
  let valid = true;

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const error = document.getElementById("error");

  error.classList.add("hidden");

  if (!validateEmail(email.value)) {
    valid = false;
    error.classList.remove("hidden");
    error.innerHTML = "Invalid email";
  }

  if (password.value.length < 8) {
    valid = false;
    error.classList.remove("hidden");
    error.innerHTML = "Invalid email or password";
  }

  return valid;
}
