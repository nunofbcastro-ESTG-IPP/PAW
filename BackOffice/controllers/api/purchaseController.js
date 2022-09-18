var mongoose = require('mongoose');
var Purchase = require('../../models/purchase');
var Book = require('../../models/book');
var User = require('../../models/user');
var Points = require('../../models/points');

const {
  generatePaymentMethod,
  generatePaymentIntent,
} = require('../../services/stripe');

var purchaseController = {};

purchaseController.getClientPurchases = function (req, res, next) {
  let query = { clientId: req.userId };

  const { page } = req.query;

  const myCustomLabels = {
    docs: 'values',
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
      res.json(result);
    }
  });
};

purchaseController.getBooksCart = function (req, res, next) {
  const { cart } = req.body;

  if (cart == null || cart == '[]') {
    return res.status(500).send("{ message: 'Invalid cart' }");
  }

  const cartArray = JSON.parse(cart);

  let query = {};
  query['$or'] = [];

  for (let b of cartArray) {
    query['$or'].push({ _id: b._id });
  }

  Book.find(query, function (err, books) {
    if (err) {
      next(err);
    } else {
      res.json(books);
    }
  });
};

async function getBook(id) {
  if (id == undefined) {
    return null;
  }

  return await Book.findOne({ _id: id }).exec();
}

async function validateItem(cartItem) {
  if (
    cartItem == null ||
    cartItem._id == null ||
    cartItem.isbn == null ||
    cartItem.title == null ||
    cartItem.state == null ||
    cartItem.quantity == null ||
    cartItem.price == null ||
    cartItem.image == null
  ) {
    return false;
  }

  const book = await getBook(cartItem._id);

  if (book == null) {
    return false;
  }

  if (
    book.isbn != cartItem.isbn ||
    book.title != cartItem.title ||
    book.image != cartItem.image
  ) {
    return false;
  }

  for (let i = 0; i < book.price.length; i++) {
    if (book.price[i].state == cartItem.state) {
      if (
        book.price[i].price == cartItem.price &&
        book.price[i].stock >= cartItem.quantity
      ) {
        cartItem.stateID = i;
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}

async function validateCart(cartArray) {
  for (let i of cartArray) {
    if (!(await validateItem(i))) {
      return false;
    }
  }
  return true;
}

function amountCart(cartArray) {
  amount = 0;

  for (let i of cartArray) {
    amount += i.price * i.quantity;
  }

  return amount;
}

async function getUser(id) {
  if (id == undefined) {
    return null;
  }

  return await User.findOne({ _id: id }).exec();
}

function decrementBookStock(cart) {
  let atributte = 'price.' + cart.stateID + '.stock';

  Book.findByIdAndUpdate(
    { _id: cart._id },
    { $inc: { [atributte]: -cart.quantity } },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
}

function decrementBooksStock(cart) {
  for (item of cart) {
    decrementBookStock(item);
  }
}

function getUserAge(dateOfBirthday) {
  var ageDifMs = Date.now() - dateOfBirthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

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

purchaseController.payment = async function (req, res) {
  const { token, cart, name, pointsUsed } = req.body;

  if (req.body.shipping == null) {
    return res.status(500).send("{ message: 'Invalid shipping' }");
  }

  shipping = JSON.parse(req.body.shipping);

  if (
    shipping.name == null ||
    shipping.phoneNumber == null ||
    shipping.address == null
  ) {
    return res.status(500).send("{ message: 'Invalid shipping' }");
  }

  if (cart == null || cart == '[]') {
    return res.status(500).send("{ message: 'Invalid cart' }");
  }

  if (token == null) {
    return res.status(500).send("{ message: 'Invalid token' }");
  }

  if (name == null) {
    return res.status(500).send("{ message: 'Invalid name' }");
  }

  const user = await getUser(req.userId);

  if (user == null) {
    return res.status(500).send("{ message: 'Invalid user' }");
  }

  if (pointsUsed == null || pointsUsed > user.points) {
    return res.status(500).send("{ message: 'Invalid points' }");
  }

  const cartArray = JSON.parse(cart);

  if (!(await validateCart(cartArray))) {
    return res.status(500).send("{ message: 'Invalid cart' }");
  }

  let amount = amountCart(cartArray);
  amount = amount - amount * (pointsUsed / 100);

  try {
    const resOrder = {
      amount: amount.toFixed(2),
      name: name,
      email: user.email,
    };

    const responseMethod = await generatePaymentMethod(token);

    const resPaymentIntent = await generatePaymentIntent({
      amount: resOrder.amount,
      userName: resOrder.name,
      email: resOrder.email,
      payment_method: responseMethod.id,
    });

    newPurchase = {
      clientId: user.id,
      clientEmail: user.email,
      books: [],
      pointsUsed: pointsUsed,
      totalPrice: amount,
      shipping: {
        name: shipping.name,
        phoneNumber: shipping.phoneNumber,
        address: shipping.address,
      },
    };

    for (cartItem of cartArray) {
      newPurchase.books.push({
        bookId: cartItem._id,
        isbn: cartItem.isbn,
        title: cartItem.title,
        state: cartItem.state,
        quantity: cartItem.quantity,
        unitaryPrice: cartItem.price,
        image: cartItem.image,
      });
    }

    Purchase.create(newPurchase)
      .then((purchase) => {
        res.send({ data: resPaymentIntent });
        decrementBooksStock(cartArray);

        addPurchaseToClient(purchase._id, user, pointsUsed);
      })
      .catch((err) => {
        res.status(500).send("{ message: 'Something went wrong' }");
      });
  } catch (e) {
    res.status(500).send("{ message: 'Something went wrong' }");
  }
};

module.exports = purchaseController;
