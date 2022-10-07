const express = require("express");
const router = express.Router();
const signupController=require("../controllers/signupController")
router.get("/login",signupController.loginPage);
router.get("/signup",signupController.signupPage);
router.post("/signup",signupController.signupPost)
router.get("login/auth/google",signupController.googleAuth)
router.get("logout",signupController.logout);

module.exports = router;