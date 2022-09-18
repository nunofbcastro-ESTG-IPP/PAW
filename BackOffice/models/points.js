var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var pointsSchema = new mongoose.Schema({
  name: String,
  minAge: Number,
  maxAge: Number,
  pointsGiven: Number,
});

pointsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("points", pointsSchema);
