const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { USER, Checkout } = require("../models/userSchema");
const Productdata = require("../models/productSchema");

const secretKey = process.env.SECRET_KEY;

const getProducts = async (req, res) => {
  try {
    const products = await Productdata.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    return res.status(400).json(error);
    // console.error("error" + error.message);
  }
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, cpassword } = req.body;

  if (!firstname || !lastname || !email || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please fill in all the required fields." });
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      return res.status(422).json({ error: "This email is already in use." });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match." });
    } else {
      const newUser = new USER({
        firstname,
        lastname,
        email,
        password,
        cpassword,
      });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      newUser.password = hash;
      await newUser.save();
      return res.status(200).json({ message: "User Registered successfully!" });
    }
  } catch (error) {
    res.status(422).json({ error: "Registration failed. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", error: "Required fields are empty" });
  }
  try {
    const loginuser = await USER.findOne({ email: email });
    if (loginuser) {
      const isMatch = await bcrypt.compare(password, loginuser.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "fail", error: "Invalid password" });
      } else {
        let token = jwt.sign({ id: loginuser._id }, secretKey, {
          expiresIn: "1d",
        });
        req.headers.authorization = `Bearer ${token}`;

        res.status(200).json({ token: token });
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(422).json({
      error: error.message || "Registration failed. Please try again.",
    });
  }
};

const getaProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const individual = await Productdata.findOne({ id: id });
    // console.log(individual);

    res.status(201).json(individual);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });

    const Usercontact = await USER.findOne({ _id: req.userID });

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);

      await cartData.save();
      return res.status(201).json(cartData);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid user context" });
  }
};

const getCartDetails = async (req, res) => {
  try {
    console.log("Requesting cart details for userID:", req.userID);

    const buyuser = await USER.findOne({ _id: req.userID });
    console.log("Retrieved user data:", buyuser);

    if (!buyuser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(buyuser);
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const validateUser = async (req, res) => {
  try {
    const validateuser = await USER.find({ _id: req.userID });
    console.log(validateuser);
    res.status(200).json(validateuser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((item) => {
      return item.id != id;
    });
    req.rootUser.save();
    res.status(200).json(req.rootUser);
    console.log("Items removed successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json(req.rootUser);
  }
};

const checkout = async (req, res) => {
  const { userId } = req.params;
  const checkoutData = req.body;

  try {
    // Create a new Checkout document
    const newCheckout = new Checkout(checkoutData);
    await newCheckout.save();

    // Update the user's checkoutInfo field with the ID of the new Checkout document
    await USER.findByIdAndUpdate(userId, { checkoutInfo: newCheckout._id });

    res.json({
      success: true,
      message: "Checkout information saved successfully",
    });
  } catch (error) {
    console.error("Error while saving checkout information:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save checkout information" });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((item) => {
      return item.token !== req.token;
    });
    res.status(200).json(req.rootUser.tokens);
    await req.rootUser.save();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getProducts,
  registerUser,
  loginUser,
  getaProduct,
  addToCart,
  getCartDetails,
  validateUser,
  removeFromCart,
  checkout,
  logoutUser,
};
