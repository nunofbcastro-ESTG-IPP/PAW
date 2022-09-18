var mongoose = require('mongoose');
var Subscriber = require('../../models/subscriber');
const validator = require('validator');

var subscriberController = {};

subscriberController.addSubscriber = async function (req, res, next) {
  const { email } = req.body;

  if (email == null || !validator.isEmail(email)) {
    return res.status(500).send("{mensage: 'Invalid email'}");
  }

  let subscriber = new Subscriber({ clientEmail: email });

  subscriber.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(subscriber);
    }
  });
};

module.exports = subscriberController;
