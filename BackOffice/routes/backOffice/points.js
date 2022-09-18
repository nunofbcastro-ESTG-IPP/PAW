var express = require('express');
var router = express.Router();

var points = require('../../controllers/backOffice/PointsController.js');
const authentication = require('../../controllers/backOffice/AuthenticationController.js');

router.get('/list', authentication.verifyTokenAdmin, points.list);
router.get('/edit/:id', authentication.verifyTokenAdmin, points.ediGet);
router.post('/edit/:id', authentication.verifyTokenAdmin, points.editPost);

module.exports = router;
