let express = require('express');
let router = express.Router();

let authController = require('../../controllers/api/authController');
let usersController = require('../../controllers/api/usersController');

router.get('/', authController.verifyToken, usersController.getUser);

router.put('/', authController.verifyToken, usersController.updateUser);

module.exports = router;
