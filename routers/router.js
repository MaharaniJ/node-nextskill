const express = require("express");
const router = new express.Router();
const userController = require("../controllers/userController");
const authentication = require("../middleware/authenticate");

router.get("/getproducts", async (req, res) => {
  // Existing route logic
});

router.get("/getproduct/:id", async (req, res) => {
  // Existing route logic
});

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/addtocart/:id", authentication, userController.addToCart);

router.get("/cartdetails", authentication, userController.getCartDetails);

router.get("/validuser", authentication, userController.validateUser);

router.get("/remove/:id", authentication, userController.removeFromCart);

router.get("/logout", authentication, userController.logoutUser);

module.exports = router;
