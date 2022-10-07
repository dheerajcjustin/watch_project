const express = require("express");
const router = express.Router();
const signupController=require("../controllers/signupController")
const homeController=require("../controllers/homeController")

router.get("/",homeController.homePage);
module.exports = router;
