const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");const validator = require("validator");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secretKey, {
      expiresIn: "1d",
    });
    console.log("geneate-Token",token)
    if (!token) {
      throw new Error("Token generation failed.");
    }

    this.tokens = this.tokens.concat({ token: token });
    await this.save();

    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw error; // Re-throw the error for higher-level handling if necessary.
  }
};

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
