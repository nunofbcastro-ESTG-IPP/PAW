var express = require('express');
var router = express.Router();

let authController = require('../../controllers/api/authController');
let purchaseController = require('../../controllers/api/purchaseController.js');

router.get(
  '/',
  authController.verifyToken,
  purchaseController.getClientPurchases
);
router.post('/booksCart', purchaseController.getBooksCart);
router.post('/payment', authController.verifyToken, purchaseController.payment);

module.exports = router;
