var mongoose = require('mongoose');
var Book = require('../../models/book');
var User = require('../../models/user');

var bookController = {};

bookController.getAllBooks = function (req, res, next) {
  const { page, search, sort, ordination } = req.query;
  let query = { $and: [{ state: 'Active' }] };
  let querySort = {};

  if (search != null) {
    let or = [];
    or.push({ title: { $regex: search, $options: 'i' } });
    or.push({ author: { $regex: search, $options: 'i' } });
    or.push({ publishers: { $regex: search, $options: 'i' } });
    if (!isNaN(search)) {
      or.push({ isbn: Number(search) });
    }
    query.$and.push({ $or: or });
  }

  if (sort != null && ordination != null && !isNaN(ordination)) {
    querySort[sort] = ordination;
  }

  const myCustomLabels = {
    docs: 'values',
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    sort: querySort,
    limit: 10,
    customLabels: myCustomLabels,
  };

  Book.paginate(query, options, function (err, result) {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
};

bookController.getOneBook = function (req, res) {
  if (req.book) {
    return res.json(req.book);
  }
  return res.status(500).send("{ message: 'Invalid id' }");
};

bookController.getByIdBook = function (req, res, next, id) {
  Book.findOne({ _id: id }, function (err, book) {
    if (err) {
      next(err);
    } else {
      req.book = book;
      next();
    }
  });
};

async function getUser(id) {
  if (id == undefined) {
    return null;
  }

  return await User.findOne({ _id: id }).exec();
}

bookController.addReview = async function (req, res) {
  const { review, rating } = req.body;

  if (review == null || review.length < 3) {
    return res.status(500).send("{ message: 'Invalid user' }");
  }

  if (rating == null || isNaN(rating) || rating > 5 || rating < 1) {
    return res.status(500).send("{ message: 'Invalid user' }");
  }

  const user = await getUser(req.userId);

  if (user == null) {
    return res.status(500).send("{ message: 'Invalid user' }");
  }

  Book.findByIdAndUpdate(
    { _id: req.book._id },
    {
      $push: {
        review: [
          {
            clientId: req.userId,
            clientName: user.name,
            clientEmail: user.email,
            clientImage: user.profileImage,
            review: req.body.review,
            rating: req.body.rating,
          },
        ],
      },
    },
    function (err, book) {
      if (err) {
        console.log(err);
      } else {
        res.json(book);
      }
    }
  );
};

module.exports = bookController;
