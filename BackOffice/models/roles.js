var mongoose = require("mongoose");

var RoleSchema = new mongoose.Schema({
  role: String,
});

module.exports = mongoose.model("Role", RoleSchema);
