const form = document.getElementById("form");
form.onsubmit = validate;

const isbnInput = document.getElementById("isbn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const publishersInput = document.getElementById("publishers");
const numberPagesInput = document.getElementById("numberPages");
numberPagesInput.oninput =
  "this.value = this.value.replace(/[^0-9.]/g, '').replace(/(..*?)..*/g, '$1');";
const publishDateInput = document.getElementById("publishDate");
const priceNewInput = document.getElementById("priceNew");
const priceOldInput = document.getElementById("priceOld");
const stockNewInput = document.getElementById("stockNew");
const stockOldInput = document.getElementById("stockOld");
const languageInput = document.getElementById("language");
const descriptionInput = document.getElementById("description");

const coverBookInput = document.getElementById("coverBookInput");
const coverBookImage = document.getElementById("coverBookImage");
coverBookInput.onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement,
    files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      coverBookImage.classList.remove("hidden");
      coverBookImage.src = fr.result;
    };
    fr.readAsDataURL(files[0]);
  } else {
    coverBookImage.classList.add("hidden");
    coverBookImage.src = "";
  }
};

function selectLanguage(lang) {
  languageInput.value = lang;
}

function showError(input) {
  input.parentNode.lastElementChild.classList.remove("hidden");
}

function hiddenError(input) {
  input.parentNode.lastElementChild.classList.add("hidden");
}

function validate() {
  let valid = true;

  hiddenError(isbnInput);
  hiddenError(titleInput);
  hiddenError(authorInput);
  hiddenError(publishersInput);
  hiddenError(numberPagesInput);
  hiddenError(languageInput);
  hiddenError(priceNewInput);
  hiddenError(priceOldInput);
  hiddenError(stockNewInput);
  hiddenError(stockOldInput);
  hiddenError(publishDateInput);
  hiddenError(descriptionInput);

  let isbn = isbnInput.value;
  let title = titleInput.value;
  let author = authorInput.value;
  let publishers = publishersInput.value;
  let numberPages = numberPagesInput.value;
  let language = languageInput.value;
  let priceNew = priceNewInput.value;
  let priceOld = priceOldInput.value;
  let stockNew = stockNewInput.value;
  let stockOld = stockOldInput.value;
  let publishDate = new Date(publishDateInput.value);
  let description = descriptionInput.value;

  if (isNaN(isbn) || isbn.length != 13) {
    showError(isbnInput);
    valid = false;
  }
  if (title.length < 3) {
    showError(titleInput);
    valid = false;
  }
  if (author.length < 3) {
    showError(authorInput);
    valid = false;
  }
  if (publishers.length < 3) {
    showError(publishersInput);
    valid = false;
  }
  if (numberPages == "" || isNaN(numberPages) || numberPages < 0) {
    showError(numberPagesInput);
    valid = false;
  }
  if (language == "") {
    showError(languageInput);
    valid = false;
  }
  if (priceNew == "" || isNaN(priceNew) || priceNew < 0) {
    showError(priceNewInput);
    valid = false;
  }
  if (priceOld == "" || isNaN(priceOld) || priceOld < 0) {
    showError(priceOldInput);
    valid = false;
  }
  if (stockNew == "" || isNaN(stockNew) || stockNew < 0) {
    showError(stockNewInput);
    valid = false;
  }
  if (stockOld == "" || isNaN(stockOld) || stockOld < 0) {
    showError(stockOldInput);
    valid = false;
  }
  if (!publishDate instanceof Date || isNaN(publishDate)) {
    showError(publishDateInput);
    valid = false;
  }
  if (description.length < 3) {
    showError(descriptionInput);
    valid = false;
  }

  return valid;
}
