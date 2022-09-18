let express = require('express');
let router = express.Router();

let authController = require('../../controllers/api/authController');
let booksController = require('../../controllers/api/booksController.js');

router.get('/', booksController.getAllBooks);
router.get('/:booksId', booksController.getOneBook);
router.post(
  '/addReview/:booksId',
  authController.verifyToken,
  booksController.addReview
);

router.param('booksId', booksController.getByIdBook);

module.exports = router;
