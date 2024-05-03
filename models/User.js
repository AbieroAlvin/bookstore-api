const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  ],
});

const User = mongoose.model("bookUser", userSchema);

module.exports = User;
