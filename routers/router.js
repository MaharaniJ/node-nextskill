const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/controller");
const {authentication} = require("../middleware/authenticate");
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

router.post("/addtocart/:id",authentication, controllers.addToCart);

router.get("/cartdetails",authentication, controllers.getCartDetails);

router.get("/validuser",authentication,  controllers.validateUser);

router.get("/remove/:id",authentication,  controllers.removeFromCart);

router.get("/logout/:id",authentication,  controllers.logoutUser);

router.post("/checkout",authentication, controllers.checkout)

module.exports = router;
