var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: [true, 'Invalid ISBN'],
    index: true,
    unique: true,
    match: /^[0-9]{13}$/,
  },
  title: String,
  descrition: String,
  author: String,
  number_of_pages: Number,
  publishers: String,
  publishDate: String,
  lang: String,
  price: [
    {
      state: String,
      price: mongoose.Types.Decimal128,
      stock: Number,
    },
  ],
  image: String,
  state: { type: String, default: 'Active' },
  review: [
    {
      clientId: mongoose.Types.ObjectId,
      clientName: String,
      clientEmail: String,
      clientImage: String,
      review: String,
      rating: Number,
    },
  ],
  updated_at: { type: Date, default: Date.now },
});

BookSchema.set('toJSON', {
  transform: (doc, ret) => {
    for (let p of ret.price) {
      p.price = p.price.toString();
    }
    return ret;
  },
});

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema);
