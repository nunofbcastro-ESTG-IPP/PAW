var mongoose = require("mongoose");

var LanguageSchema = new mongoose.Schema({
  code: String,
  name: String,
  native: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Language", LanguageSchema);
