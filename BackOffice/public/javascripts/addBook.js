const apiOpenlibrary = "https://openlibrary.org";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

isbnInput.onkeyup = debounce(() => getBookData());

async function getNameAuthor(authorsLink) {
  let author = await fetch(`${apiOpenlibrary}${authorsLink}.json`, {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => JSON.parse(data));
  return author.personal_name;
}

async function getLanguage(languageLink) {
  let language = await fetch(`${apiOpenlibrary}${languageLink}.json`, {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => JSON.parse(data));

  return language.identifiers.iso_639_1[0];
}

async function getBookData() {
  if (isbnInput.value.length == 13) {
    const isbn = isbnInput.value;

    let dataBook = await fetch(`${apiOpenlibrary}/isbn/${isbn}.json`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => JSON.parse(data))
      .catch((error) => {
        console.log(error);
        return;
      });

    const { publishers, number_of_pages, authors, languages, title, publish_date } = dataBook;

    if (typeof title != "undefined") {
      titleInput.value = title;
    }
    if (typeof publishers != "undefined") {
      publishersInput.value = publishers;
    }
    if (typeof number_of_pages != "undefined") {
      numberPagesInput.value = number_of_pages;
    }
    if (typeof publish_date != "undefined") {
      publishDateInput.value = new Date(publish_date).toLocaleDateString("en");
    }
    if (typeof dataBook.description != "undefined" && typeof dataBook.description.value != "undefined") {
      descriptionInput.value = dataBook.description.value;
    }
    if (typeof authors != "undefined") {
      authorInput.value = await getNameAuthor(authors[0].key);
    }
    if (typeof languages != "undefined") {
      languageInput.value = await getLanguage(languages[0].key);
    }
  }
}
