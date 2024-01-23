const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/controller");
const authentication = require("../middleware/authenticate");
// const {
//   registerUser,
//   loginUser,
//   addToCart,
//   getCartDetails,
//   validateUser,
//   removeFromCart,
//   logoutUser,
// } = require("../controllers/controller");



router.get("/getproducts", controllers.getProducts);

router.get("/getproduct/:id",controllers.getaProduct);

router.post("/register",controllers.registerUser);

router.post("/login", controllers.loginUser);

router.post("/addtocart/:id", controllers.addToCart);

router.get("/cartdetails", controllers.getCartDetails);

router.get("/validuser",  controllers.validateUser);

router.get("/remove/:id",  controllers.removeFromCart);

router.get("/logout",  controllers.logoutUser);
router.post("/checkout", controllers.checkout)

module.exports = router;
