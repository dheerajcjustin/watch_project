const express = require("express");
const signupController=require("../controllers/signupController")
const homeController=require("../controllers/homeController")
const userProducts=require("../controllers/userProductsControll");
const router = express.Router();



router.get("/",homeController.homePage)
router.get("/products",userProducts.listProducts);
router.get("/cart",userProducts.cartPage);
router.get("/product/:id",userProducts.viewProduct);
router.post("/cartadd",userProducts.cartAdd);
router.post("/cartedit",userProducts.cartEdit);

module.exports = router;


