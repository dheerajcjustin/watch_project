const express = require("express");
const multer=require("multer")
const {storage,cloudinary}=require("../config/cloudinary");
const upload = multer({storage })
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

router.get("/",adminController.adminHomePage);
router.get("/brands",adminController.adminBrandPage);
router.post("/brands",upload.array('logo'),adminController.adminBrandAddPost);
router.get("/categorys",categoryController.adminCategoryPage);
router.post("/categorys",categoryController.adminCategoryAddPost);
router.put("/categorys/update/:id",categoryController.categoryUpdate);
router.delete("/categorys/update/:id",categoryController.categoryDelete);
router.post("/subcategory",categoryController.subcategoryAdd)

module.exports = router;
