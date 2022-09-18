var mongoose = require('mongoose');
var Sale = require('../../models/sale');
const User = require('../../models/user');

const bookValidations = require('../../validations/book-validations');

var salesController = {};

async function getUser(id) {
  if (id == undefined) {
    return null;
  }

  return await User.findOne({ _id: id }).exec();
}

salesController.createSales = async function (req, res, next) {
  const { bookIsbn, title, description, price } = req.body;

  if (req.fileValidationError) {
    return res.status(500).send(`{ message: 'Invalid file' }`);
  }

  let validations = {};

  validations.isbn = bookValidations.validateIsbn(bookIsbn);
  validations.title = bookValidations.validateText(title, 'title');
  validations.description = bookValidations.validateText(
    description,
    'description'
  );
  validations.price = bookValidations.validatePrice(price);

  if (
    validations.isbn != null ||
    validations.title != null ||
    validations.description != null ||
    validations.price != null ||
    validations.coverPhoto
  ) {
    return res.status(500).send(`{ message: ${validations} }`);
  }

  let userData = await getUser(req.userId);

  if (userData == null) {
    return res.status(500).send("{ message: 'Invalid user' }");
  }

  var sale = new Sale({
    clientId: req.userId,
    clientEmail: userData.email,
    bookIsbn: bookIsbn,
    title: title,
    coverPhoto: req.file.filename,
    description: description,
    price: price,
  });

  sale.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(sale);
    }
  });
};

salesController.getSales = function (req, res) {
  let query = { clientId: req.userId };

  const { page } = req.query;

  const myCustomLabels = {
    docs: 'values',
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    sort: { submitted_at: -1 },
    limit: 10,
    customLabels: myCustomLabels,
  };

  Sale.paginate(query, options, function (err, result) {
    if (err) {
      console.log('Error', err);
    } else {
      res.json(result);
    }
  });
};

module.exports = salesController;
