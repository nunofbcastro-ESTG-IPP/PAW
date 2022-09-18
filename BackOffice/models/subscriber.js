var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var SubscriberSchema = new mongoose.Schema({
  clientEmail: String,
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
