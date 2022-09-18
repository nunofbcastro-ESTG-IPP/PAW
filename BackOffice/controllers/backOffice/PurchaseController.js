const mongoose = require('mongoose');
const Book = require('../../models/book');
const Purchase = require('../../models/purchase');
const User = require('../../models/user');
const Points = require('../../models/points');

const purchaseController = {};

purchaseController.purchaseBookGet = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  Book.findOne({ _id: req.params.id }).exec(function (err, book) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(book);
      res.render('../views/books/purchase', {
        userProfile: req.user,
        title: 'Purchase Book',
        book: book,
        userError: false,
        quantityError: false,
      });
    }
  });
};

purchaseController.confirmPurchaseGet = async function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  const {
    client,
    isbn,
    title,
    state,
    quantity,
    unitaryPrice,
    pointsUsed,
    totalPrice,
  } = req.body;

  let user = await getUserByEmail(client);
  let book = await getBookByIsbn(isbn);

  let purchase = new Purchase({
    clientEmail: client,
    books: [
      {
        bookId: book._id,
        isbn: isbn,
        title: title,
        state: state,
        quantity: quantity,
        unitaryPrice: unitaryPrice,
      },
    ],
    pointsUsed: pointsUsed,
    totalPrice: totalPrice,
  });

  let userError = false;
  let quantityError = false;

  if (user == null) {
    userError = true;
  }

  if (!validateQuantity(purchase, book)) {
    quantityError = true;
  }

  if (userError == false && quantityError == false) {
    purchase.clientId = user._id;

    res.render('../views/books/confirmPurchase', {
      userProfile: req.user,
      title: 'Confirm Purchase Book',
      user: user,
      purchase: purchase,
      book: book,
      userError: false,
      quantityError: false,
    });
  } else {
    res.render('../views/books/purchase', {
      userProfile: req.user,
      title: 'Purchase Book',
      book: book,
      purchase: purchase,
      userError: userError,
      quantityError: quantityError,
    });
  }
};

/**
 * Validates if the stock is enough to the required in purchase
 * @param {*} purchase purchase to valid
 * @param {*} book book to be purchased
 * @returns false if the quantity to be purchased is greater than actual stock, true otherwise.
 */
function validateQuantity(purchase, book) {
  for (let i = 0; i < book.price.length; i++) {
    if (
      purchase.state == book.price[i].state &&
      purchase.quantity > book.price[i].stock
    ) {
      return false;
    }
  }
  return true;
}

purchaseController.save = async function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  const { client, isbn, title, state, quantity, pointsUsed, totalPrice } =
    req.body;

  let user = await getUserByEmail(client);
  let book = await getBookByIsbn(isbn);
  let unitaryPrice = await getBookPriceByState(book, state);

  var purchase = new Purchase({
    clientId: user._id,
    clientEmail: client,
    books: [
      {
        bookId: book._id,
        isbn: isbn,
        title: title,
        state: state,
        quantity: quantity,
        unitaryPrice: unitaryPrice,
      },
    ],
    pointsUsed: pointsUsed,
    totalPrice: totalPrice,
  });

  //? Save purchase data in collection
  purchase.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      //? Decrement stock from the book purchased
      decrementBookStock(book, purchase.state, purchase.quantity);

      //? Regist the purchase id in the user account
      addPurchaseToClient(purchase._id, user, req.body.pointsUsed);
      res.redirect('/book/listBooks');
    }
  });
};

/**
 * Get data of user by email.
 * @param {*} userEmail The email of user
 * @returns user if exists an user with this email, null if not exists.
 */
async function getUserByEmail(userEmail) {
  let user = await User.findOne({ email: userEmail }).exec();

  console.log(user);
  return user;
}

/**
 * Get data of book by isbn.
 * @param {*} bookIsbn isbn of book
 * @returns book if exists a book with this isbn, null if not exists.
 */
async function getBookByIsbn(bookIsbn) {
  let book = await Book.findOne({ isbn: bookIsbn }).exec();

  return book;
}

async function getBookPriceByState(book, state) {
  for (let i = 0; i < book.price.length; i++) {
    if (book.price[i].state == state) {
      return book.price[i].price;
    }
  }
}

/**
 * Decrement stock of book due to the quantity and condition selected on purchase
 * @param {*} book The book
 * @param {*} condition The condition selected in purchase
 * @param {*} quantity The quantity required in purchase
 */
function decrementBookStock(book, condition, quantity) {
  let atributte;

  for (var i = 0; i < book.price.length; i++) {
    if (book.price[i].state == condition) {
      atributte = 'price.' + i + '.stock';
      break;
    }
  }

  Book.findByIdAndUpdate(
    { _id: book._id },
    { $inc: { [atributte]: -quantity } },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
}

/**
 * Add the purchase ID to the client profile
 * @param {*} purchaseId Purchase ID
 * @param {*} user The user who buys a book
 * @param {*} pointsUsed Points used by user who buys the book.
 */
async function addPurchaseToClient(purchaseId, user, pointsUsed) {
  let purchasePoints = await calculatePoints(
    getUserAge(user.dateOfBirthday),
    user.purchases.length
  );

  purchasePoints -= pointsUsed;

  User.findByIdAndUpdate(
    { _id: user._id },
    {
      $push: { purchases: purchaseId },
      $inc: { points: purchasePoints },
    },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
}

/**
 * Calculate the points earned by the user on a purchase depending on his age and number of purchases.
 * @param {*} userAge The user age
 * @param {*} numberOfPurchases The number of purchases.
 * @returns the points earned.
 */
async function calculatePoints(userAge, numberOfPurchases) {
  let addedPoints = 0;

  let points = await Points.find().exec();

  for (let i = 0; i < points.length; i++) {
    if (userAge >= points[i].minAge && userAge <= points[i].maxAge) {
      addedPoints = addedPoints + points[i].pointsGiven;
      break;
    }
  }

  addedPoints = addedPoints + Math.round(numberOfPurchases * 0.25);

  return addedPoints;
}

/**
 * Get the userAge in years depending on his date of birthday
 * @param {*} dateOfBirthday The user date of birthday
 * @returns the user age in years
 */
function getUserAge(dateOfBirthday) {
  var ageDifMs = Date.now() - dateOfBirthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

purchaseController.list = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  let query = {};

  const { page } = req.query;

  const myCustomLabels = {
    docs: 'purchases',
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    sort: { purchased_at: -1 },
    limit: 20,
    customLabels: myCustomLabels,
  };

  Purchase.paginate(query, options, function (err, result) {
    if (err) {
      console.log('Error', err);
    } else {
      result.userProfile = req.user;
      result.title = 'List Purchases';
      res.render('../views/books/listPurchases', result);
    }
  });
};

module.exports = purchaseController;
