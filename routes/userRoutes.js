const express = require("express");
const signupController=require("../controllers/signupController")
const homeController=require("../controllers/homeController")
const CartAndAcount=require("../controllers/CartAndAcount");
const userBilling = require("../controllers/userBilling")
const onlinePayment = require("../controllers/onlinePayment");
const couponController=require("../controllers/couponController");
const wishlistController=require("../controllers/wishlist");
const auth=require("../utils/auth");
const router = express.Router();


router.get("/", homeController.homePage)
router.get("/products",homeController.listProducts);
router.get("/product/mens",homeController.mensProduct);
router.get("/product/womens",homeController.womensProduct);
router.get("/product/:id",CartAndAcount.viewProduct);

router.use(auth.userAuth);
router.post("/password/eidt",signupController.editPassword);
router.get("/cart", CartAndAcount.cartPage);
router.get("/account", CartAndAcount.accountPage);
router.get("/wishlist",wishlistController.wishlistView);
router.post("/wishlistDelete",wishlistController.wishlistDelete);

router.post("/cartadd",CartAndAcount.cartAdd);
router.post("/cartedit",CartAndAcount.cartEdit);
router.delete("/cart",CartAndAcount.cartDelete)
router.get("/checkout",userBilling.checkoutPage);
router.post("/addressPost", userBilling.addressPost);
router.patch("/addressedit", userBilling.addressedit)
router.post("/orderRedirect", userBilling.orderRedirect);
router.get("/myOrder", userBilling.orderPage);
router.get("/myOrder/:id", userBilling.viewOrder);
router.post("/payment/razorpay", onlinePayment.razorpayPayment);
router.post('/coupon/apply',couponController.couponApply);
router.post("/checkout/verify", onlinePayment.checkPayment);
router.post("/wishlist/add",wishlistController.wishlistAdd);


module.exports = router;


