const mongoose = require('mongoose');

const Book = require('../../models/book');
const Language = require('../../models/language');

const Subscriber = require('../../models/subscriber');
const { sendEmail } = require('../../services/email');

const bookController = {};

bookController.showBook = function (req, res) {
  const { id } = req.params;
  Book.findOne({ _id: id, state: 'Active' }).exec(function (err, book) {
    if (err) {
      res.redirect('/404');
    } else {
      res.render('../views/books/showBook', {
        userProfile: req.user,
        book: book,
        title: book.title,
      });
    }
  });
};

bookController.list = function (req, res) {
  const { page, fieldSearch, search } = req.query;
  let query = { $and: [{ state: 'Active' }] };

  if (typeof search != 'undefined') {
    if (typeof fieldSearch != 'undefined' && fieldSearch != 'all') {
      if (fieldSearch != 'ISBN') {
        query.$and.push({ [fieldSearch]: { $regex: search, $options: 'i' } });
      } else {
        query.$and.push({ isbn: Number(search) });
      }
    } else {
      let or = [];
      or.push({ title: { $regex: search, $options: 'i' } });
      or.push({ author: { $regex: search, $options: 'i' } });
      or.push({ publishers: { $regex: search, $options: 'i' } });
      if (!isNaN(search)) {
        or.push({ isbn: Number(search) });
      }
      query.$and.push({ $or: or });
    }
  }

  const myCustomLabels = {
    //totalDocs: 'itemCount',
    docs: 'books',
    /*limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',*/
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    limit: 10,
    customLabels: myCustomLabels,
  };

  Book.paginate(query, options, function (err, result) {
    if (err) {
      console.log('Error:', err);
    } else {
      result.title = 'List Books';
      result.userProfile = req.user;
      res.render('../views/books/listBooks', result);
    }
  });
};

bookController.addBookGet = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  Language.find().exec(function (err, languages) {
    if (err) {
      console.log('Error:', err);
    } else {
      res.render('../views/books/addBook', {
        userProfile: req.user,
        languages: languages,
        title: 'Add Book',
        error: req.query.error,
      });
    }
  });
};

function validateBook(
  res,
  title,
  author,
  publishers,
  numberPages,
  publishDate,
  language,
  priceNew,
  stockNew,
  stockOld,
  priceOld,
  description
) {
  if (title.length < 3) {
    res.redirect('/book/addBook?error=Invalid title');
  }
  if (author.length < 3) {
    res.redirect('/book/addBook?error=Invalid author');
  }
  if (publishers.length < 3) {
    res.redirect('/book/addBook?error=Invalid publishers');
  }
  if (numberPages == '' || isNaN(numberPages) || numberPages < 0) {
    res.redirect('/book/addBook?error=Invalid number pages');
  }
  if (language == '') {
    res.redirect('/book/addBook?error=Invalid language');
  }
  if (priceNew == '' || isNaN(priceNew) || priceNew < 0) {
    res.redirect('/book/addBook?error=Invalid priceNew');
  }
  if (priceOld == '' || isNaN(priceOld) || priceOld < 0) {
    res.redirect('/book/addBook?error=Invalid priceOld');
  }
  if (stockNew == '' || isNaN(stockNew) || stockNew < 0) {
    res.redirect('/book/addBook?error=Invalid stock new book');
  }
  if (stockOld == '' || isNaN(stockOld) || stockOld < 0) {
    res.redirect('/book/addBook?error=Invalid stock old book');
  }
  if (!publishDate instanceof Date || isNaN(publishDate)) {
    res.redirect('/book/addBook?error=Invalid publish date');
  }
  if (description.length < 3) {
    res.redirect('/book/addBook?error=Invalid description');
  }
}

async function getSubscribers() {
  return await Subscriber.find().exec();
}

async function sendNewEmail(bookTitle) {
  let emails = await getSubscribers();

  if (emails == null) {
    return false;
  }

  let sended = await sendEmail(
    emails,
    `BookMarket news`,
    `Book "${bookTitle}" for more information go to our website.`
  );
  return sended;
}

bookController.addBookPost = async function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  if (req.fileValidationError) {
    return res.redirect('/book/addBook?error=Invalid file');
  }

  const {
    isbn,
    title,
    author,
    publishers,
    numberPages,
    publishDate,
    language,
    priceNew,
    stockNew,
    stockOld,
    priceOld,
    description,
  } = req.body;

  validateBook(
    res,
    title,
    author,
    publishers,
    numberPages,
    new Date(publishDate),
    language,
    priceNew,
    stockNew,
    stockOld,
    priceOld,
    description
  );

  Book.create({
    isbn: isbn,
    title: title,
    descrition: description,
    author: author,
    number_of_pages: numberPages,
    publishers: publishers,
    publishDate: publishDate,
    lang: language,
    price: [
      { state: 'new', price: priceNew, stock: stockNew },
      { state: 'old', price: priceOld, stock: stockOld },
    ],
    image: req.file ? req.file.filename : 'noImage.jpg',
  })
    .then((book) => {
      res.redirect(`/book/showBook/${book._id}`);
      sendNewEmail(book.title);
    })
    .catch((err) => {
      res.redirect('/book/addBook?error=Invalid ISBN or existing book');
    });
};

bookController.editBookGet = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  const { id } = req.params;
  Book.findOne({ _id: id }).exec(function (err, book) {
    if (err) {
      console.log('Error:', err);
    } else {
      Language.find().exec(function (err, languages) {
        if (err) {
          console.log('Error:', err);
        } else {
          res.render('../views/books/editBook', {
            userProfile: req.user,
            book: book,
            languages: languages,
            title: 'Edit Book',
          });
        }
      });
    }
  });
};

bookController.editBookPost = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  const { id } = req.params;
  const {
    title,
    author,
    publishers,
    numberPages,
    publishDate,
    language,
    priceNew,
    stockNew,
    stockOld,
    priceOld,
    description,
  } = req.body;

  validateBook(
    res,
    title,
    author,
    publishers,
    numberPages,
    new Date(publishDate),
    language,
    priceNew,
    stockNew,
    stockOld,
    priceOld,
    description
  );

  Book.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title,
        descrition: description,
        author: author,
        number_of_pages: numberPages,
        publishers: publishers,
        publishDate: publishDate,
        lang: language,
        price: [
          { state: 'new', price: priceNew, stock: stockNew },
          { state: 'old', price: priceOld, stock: stockOld },
        ],
        image: req.file ? req.file.filename : undefined,
      },
    },
    { new: true },
    function (err, book) {
      if (err) {
        res.redirect('/book/editBook/' + book._id);
      }
      res.redirect('/book/showBook/' + book._id);
    }
  );
};

bookController.removeBook = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  const { id } = req.params;

  Book.findByIdAndUpdate(
    id,
    {
      $set: {
        state: 'Inactive',
      },
    },
    { new: true },
    function (err, book) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/book/listBooks');
      }
    }
  );
};

module.exports = bookController;
