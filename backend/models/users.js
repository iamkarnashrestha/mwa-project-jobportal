const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    address: {
      state: String,
      city: String,
      street: String,
      zipcode: Number,
    },
    role: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
