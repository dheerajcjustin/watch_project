const  passport  = require("passport");
const passportSetup=require("../config/passportSetup")
const loginPage = (req, res, next) => {
  
    res.render("user/loginPage");
};

const signupPage=(req,res,next)=>{

    res.render("user/signupPage");
};
const signupPost=(req,res,next)=>{
    console.log("insider req .body ", req.body);
};

//  const googleAuth=()=>(passport.authenticate("google",{
//     scope:['email','profile'] 

//   }));
   
// const googleCb=()=>{passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
     
// })};

const logout=(req,res,next)=>{
    res.send("logout");
}
//exports.googleCb=googleCb;
exports.logout=logout;
exports.googleAuth=googleAuth;
exports.signupPost=signupPost;
exports.loginPage = loginPage;
exports.signupPage = signupPage;