var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var PurchaseSchema = new mongoose.Schema({
  clientId: mongoose.Types.ObjectId,
  clientEmail: String,
  books: [
    {
      bookId: mongoose.Types.ObjectId,
      isbn: {
        type: String,
        required: [true, 'Invalid ISBN'],
        index: true,
        match: /^[0-9]{13}$/,
      },
      title: String,
      state: String,
      quantity: Number,
      unitaryPrice: mongoose.Types.Decimal128,
      image: String,
    },
  ],
  shipping: {
    name: String,
    phoneNumber: Number,
    address: String,
  },
  pointsUsed: Number,
  totalPrice: mongoose.Types.Decimal128,
  purchased_at: { type: Date, default: Date.now },
});

PurchaseSchema.set('toJSON', {
  transform: (doc, ret) => {
    for (let b of ret.books) {
      b.unitaryPrice = b.unitaryPrice.toString();
    }

    ret.totalPrice = ret.totalPrice.toString();
    return ret;
  },
});

PurchaseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Purchase', PurchaseSchema);
