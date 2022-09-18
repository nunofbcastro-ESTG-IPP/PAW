const express = require('express');
const multer = require('multer');
const path = require('path');

let router = express.Router();

let authController = require('../../controllers/api/authController');
let salesController = require('../../controllers/api/salesController.js');

const imageFilter = require('./imageFilter');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/sales');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage, fileFilter: imageFilter.get });

router.post(
  '/',
  authController.verifyToken,
  upload.single('coverPhoto'),
  salesController.createSales
);

router.get('/', authController.verifyToken, salesController.getSales);

module.exports = router;
