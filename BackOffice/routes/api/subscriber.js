const express = require('express');
const router = express.Router();

const subscriberController = require('../../controllers/api/subscriberController');

router.post('/', subscriberController.addSubscriber);

module.exports = router;
