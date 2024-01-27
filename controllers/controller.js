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
      const finaluser = new USER({
        firstname,
        lastname,
        email,
        password,
        cpassword,
      });
      const storedata = await finaluser.save();
      // Hash the password here if needed

      res.status(201).json(storedata);
    }
  } catch (error) {
    // console.log("Error during registration: " + error.message);
    return res
      .status(422)
      .json({ error: "Registration failed. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "required fields are empty" });
  }
  try {
    const loginuser = await USER.findOne({ email: email });
    if (loginuser) {
      const isMatch = await bcrypt.compare(password, loginuser.password);
      // console.log(isMatch);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      } else {
        const token = await loginuser.generateAuthToken();
        req.headers.authorization = `Bearer ${token}`;

        res.status(200).json({ token: token });
        console.log(token);
      }
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
  }
};

const getaProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const individual = await Productdata.findOne({ id: id });
    console.log(individual);

    res.status(201).json(individual);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Productdata.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const Usercontact = await USER.findOne({ _id: req.userID });

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(product);
      await Usercontact.save();
      return res.status(200).json(cartData);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(400).json({ "validataError:": error.message });
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
