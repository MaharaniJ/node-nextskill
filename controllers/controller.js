const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");

const secretKey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  const {  firstname, lastname, email, password, cpassword } = req.body;

  if (! firstname || !lastname || !email || !password || !cpassword) {
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
    return res.status(400).json({ error: "required fields are empty" });
  }
  try {
    const loginuser = await USER.findOne({ email: email });
    if (loginuser) {
      const isMatch = await bcrypt.compare(password, loginuser.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      } else {
        // const token = await generateAuthToken(loginuser);

        let token = jwt.sign({ id: loginuser._id }, secretKey, {
          expiresIn: "1d",
        });
        req.headers.authorization = `Bearer ${token}`;

        res.status(200).json({ token: token });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });

    const Usercontact = await USER.findOne({ _id: req.userID });

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);

      await Usercontact.save();
      return res.status(201).json(Usercontact);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid user context" });
  }
};

const getCartDetails = async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    res.status(401).json({ error: "Error occurred in buynow" });
  }
};

const validateUser = async (req, res) => {
  try {
    const validateuser = await USER.find({ _id: req.userID });
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
  registerUser,
  loginUser,
  addToCart,
  getCartDetails,
  validateUser,
  removeFromCart,
  logoutUser,
};
