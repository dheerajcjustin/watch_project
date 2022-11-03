const express = require("express");
const signupController=require("../controllers/signupController")
const homeController=require("../controllers/homeController")
const userProducts=require("../controllers/userProductsControll");
const userBilling = require("../controllers/userBilling")
const onlinePayment = require("../controllers/onlinePayment");
const couponController=require("../controllers/couponController");
const wishlistController=require("../controllers/wishlist");

const router = express.Router();



router.get("/", homeController.homePage)
router.get("/account", userProducts.accountPage);
router.get("/products",homeController.listProducts);
router.get("/cart", userProducts.cartPage);
router.get("/product/mens",homeController.mensProduct);
router.get("/product/womens",homeController.womensProduct);
router.get("/wishlist",wishlistController.wishlistView);
router.post("/wishlistDelete",wishlistController.wishlistDelete);

router.get("/product/:id",userProducts.viewProduct);
router.post("/cartadd",userProducts.cartAdd);
router.post("/cartedit",userProducts.cartEdit);
router.delete("/cart",userProducts.cartDelete)
router.get("/checkout",userBilling.checkoutPage);
router.post("/addressPost", userBilling.addressPost);
router.patch("/addressedit", userBilling.addressedit)
router.post("/orderRedirect", userBilling.orderRedirect);
router.get("/myOrder", userBilling.orderPage);
router.get("/myOrder/:id", userBilling.viewOrder);
router.post("/payment/razorpay", onlinePayment.razorpayPayment);
router.post('/coupon/apply',couponController.couponApply);
router.post("/checkout/verify", onlinePayment.checkPayment);
router.post("/admin/wishlist/add",wishlistController.wishlistAdd);


module.exports = router;


