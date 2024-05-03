const express = require("express");
const router = express.Router();
const signupController=require("../controllers/signupController")
const { rawListeners } = require("../models/categoryModel");

router.post("/signup",signupController.signupPost)
//  router.get("/login/auth/google",signupController.googleAuth)

// router.get('/login/auth/google',
//   passport.authenticate('google', { scope:
//       ['email','profile' ] }
// ));
router.post("/verify/email/otpsend",signupController.otpSend)
router.post('/verify/email/otpverify',signupController.otpVerify);
router.get("/verify/email/otpresend",signupController.otpResend);

router.post("/login",signupController.loginPost)
 router.get("/logout",signupController.logout);

// router.get("/auth/googleCb",signupController.googleCb)
// router.get("/auth/googleCb",passport.authenticate('google',{session:false}),(req,res)=> {
//   console.log("hai ivendde ethi  caallbackkettothe user data");


  
  

//   res.redirect("/auth/google/success")
 
  
// });

// router.get( '/auth/googlecb',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/success'
// }));

// router.get("/auth/google/success",(req,res)=>{
//     res.send("hai kititim monuse")
    
// })


//admin login 



module.exports = router;