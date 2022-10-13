const express = require("express");
const router = express.Router();
const signupController=require("../controllers/signupController")
const passport=require("passport");
const passportSetup=require("../config/passportSetup");
const { rawListeners } = require("../models/categoryModel");

router.get("/login",signupController.loginPage);
router.get("/signup",signupController.signupPage);
router.post("/signup",signupController.signupPost)
//  router.get("/login/auth/google",signupController.googleAuth)

// router.get('/login/auth/google',
//   passport.authenticate('google', { scope:
//       ['email','profile' ] }
// ));

router.post("/login",signupController.loginPost)
 router.get("/logout",signupController.logout);

// router.get("/auth/googleCb",signupController.googleCb)
router.get("/auth/googleCb",passport.authenticate('google',{session:false}),(req,res)=> {
  console.log("hai ivendde ethi  caallbackkettothe user data");


  
  

  res.redirect("/auth/google/success")
 
  
});

// router.get( '/auth/googlecb',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/success'
// }));

router.get("/auth/google/success",(req,res)=>{
    res.send("hai kititim monuse")
    
})


//admin login 



module.exports = router;