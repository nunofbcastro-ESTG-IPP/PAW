var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var SaleSchema = new mongoose.Schema({
  clientId: mongoose.Types.ObjectId,
  clientEmail: String,
  bookIsbn: {
    type: String,
    required: [true, 'Invalid ISBN'],
    index: true,
    match: /^[0-9]{13}$/,
  },
  title: String,
  coverPhoto: String,
  description: String,
  price: mongoose.Types.Decimal128,
  status: { type: String, default: 'Pendent' },
  submitted_at: { type: Date, default: Date.now },
});

SaleSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.price = ret.price.toString();
    return ret;
  },
});

SaleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sale', SaleSchema);
