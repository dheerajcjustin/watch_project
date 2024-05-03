const express = require("express");
const multer=require("multer")
const {storage,cloudinary}=require("../config/cloudinary");
const upload = multer({storage });
// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_SECRET
// });
// const productUpload=multer({storage});
// const multer=require("multer")
// const{
//     storag,
//     cloudinary
// }=require("../cloudinary/index")

// const upload=multer({
//     storage


// });
const router = express.Router();
const signupController=require("../controllers/signupController");
const adminController=require("../controllers/adminController");
const categoryController=require("../controllers/categoryController");
const productController = require("../controllers/productController");
const couponController = require("../controllers/couponController");
const adminOrders=require("../controllers/adminOrders");
const homeController=require("../controllers/homeController")
const bannerController=require("../controllers/bannerController");
const auth=require("../utils/auth");


router.get("/adminlogin",adminController.adminLoginPage);
router.post("/adminlogin",adminController.adminLoginPost);
 router.use(auth.adminAuth);
router.get("/",homeController.adminHomePage);
router.get("/brands",adminController.adminBrandPage);
router.post("/brands",upload.array('logo'),adminController.adminBrandAddPost);
router.get("/categorys",categoryController.adminCategoryPage);
router.post("/categorys",categoryController.adminCategoryAddPost);
router.put("/categorys/update/:id",categoryController.categoryUpdate);
router.delete("/categorys/update/:id",categoryController.categoryDelete);
router.post("/subcategory",categoryController.subcategoryAdd)
router.get("/material",categoryController.materialPage);
router.post("/material",categoryController.materialAdd);
router.get("/product",productController.productPage);
router.post("/product",upload.array('productImages'),productController.productPost);
router.post("/product/fetch",productController.subcategorySelect);
router.patch("/product/edit/:prId", upload.array('productImages'), productController.productEdit);
router.get("/coupon", couponController.adminCouponPage);
router.post("/coupon",couponController.couponAdd);
router.delete("/coupon",couponController.couponDelete);
router.get("/orders",adminOrders.adminOrders);
router.post("/orders/view",adminOrders.viewOrder);
router.patch("/orders/edit",adminOrders.OrdersEdit);
router.get("/banner",bannerController.bannerPage);
router.post("/banner",upload.array('productImages',{height: 801, width: 1920, crop: "lfill"}),bannerController.banner1Post);
router.post("/bannerCard",upload.array('cartPhotos',{height: 440, width: 480, crop: "imagga_crop"}),bannerController.bannerCard);
router.get("/:id",productController.productView);


module.exports = router;
