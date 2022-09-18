var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: Number,
  address: String,
  dateOfBirthday: Date,
  profileImage: { type: String, default: 'default_image.png' },
  points: { type: Number, default: 5 },
  purchases: [],
  role: { type: String, default: 'Client' },
  status: { type: String, default: 'Active' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
