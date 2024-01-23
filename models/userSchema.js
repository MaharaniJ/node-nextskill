const mongoose = require("mongoose");
const validator = require("validator");
const checkoutSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email address");
      }
    },
  },
  companyName: String,
  country: {
    type: String,
    enum: ["", "United States", "Canada", "Mexico", "India"],
    default: "",
  },
  streetAddress: String,
  city: String,
  region: String,
  postalCode: String,
});

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const USER = mongoose.model("USERDATA", userSchema);
const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = { USER, Checkout };
