const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  watchList: {
    type: Map,
    of: Boolean,
  },
  wishList: {
    type: Map,
    of: Boolean,
  },
  historyList: {
    type: Map,
    of: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
