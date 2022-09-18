const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();

const book = require("../../controllers/backOffice/BooksController.js");
const authentication = require("../../controllers/backOffice/AuthenticationController.js");
const purchase = require("../../controllers/backOffice/PurchaseController.js");
const sale = require("../../controllers/backOffice/SaleContoller.js");

const imageFilter = require("./imageFilter");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/books");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage, fileFilter: imageFilter.get });

router.get("/showBook/:id", authentication.verifyToken, book.showBook);

router.get("/listBooks", authentication.verifyToken, book.list);

router.get(
  "/addBook",
  authentication.verifyTokenEmployeeAdmin,
  book.addBookGet
);

router.post(
  "/addBook",
  upload.single("coverBookInput"),
  urlencodedParser,
  authentication.verifyTokenEmployeeAdmin,
  book.addBookPost
);

router.get(
  "/editBook/:id",
  authentication.verifyTokenEmployeeAdmin,
  book.editBookGet
);

router.post(
  "/editBook/:id",
  upload.single("coverBookInput"),
  urlencodedParser,
  authentication.verifyTokenEmployeeAdmin,
  book.editBookPost
);

router.post(
  "/removeBook/:id",
  authentication.verifyTokenEmployeeAdmin,
  book.removeBook
);

router.get(
  "/purchaseBook/:id",
  authentication.verifyTokenEmployeeAdmin,
  purchase.purchaseBookGet
);

router.post(
  "/confirmPurchase",
  authentication.verifyTokenEmployeeAdmin,
  purchase.confirmPurchaseGet
);

router.post(
  "/purchaseBook",
  authentication.verifyTokenEmployeeAdmin,
  purchase.save
);

router.get(
  "/listPurchases",
  authentication.verifyTokenEmployeeAdmin,
  purchase.list
);

router.get("/showSale/:id", authentication.verifyToken, sale.showSale);

router.get(
  "/listSales",
  authentication.verifyTokenEmployeeAdmin,
  sale.getAllSales
);

router.post(
  "/changeSaleStatus/:id/:status",
  authentication.verifyTokenEmployeeAdmin,
  sale.changeStatus
);

module.exports = router;
