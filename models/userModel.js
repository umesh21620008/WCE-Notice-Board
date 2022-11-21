const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    requied: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    requied: true,
  },
  department: {
    type: String,
    trim: true,
    requied: true,
  },
});
const users = mongoose.model("users", userSchema);

module.exports = users;
