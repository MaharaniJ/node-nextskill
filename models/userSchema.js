const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const validator = require("validator");

const checkoutSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
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
  companyname: String,
  country: {
    type: String,
    enum: ["", "United States", "Canada", "Mexico", "India"],
    default: "",
  },
  streetaddress: String,
  city: String,
  region: String,
  postalcode: String,
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
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
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  carts: Array,
});



userSchema.methods.addcartdata = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    console.log(this.carts);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error + "");
  }
};

const USER = mongoose.model("USERDATA", userSchema);
const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = { USER, Checkout };
