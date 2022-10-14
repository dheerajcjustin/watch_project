// const  passport  = require("passport");
// const passportSetup=require("../config/passportSetup")
const User=require("../models/userModel");
const bcrypt=require("bcrypt")
const loginPage = (req, res, next) => {
  
    res.render("user/loginPage");
};

const signupPage=(req,res,next)=>{

    res.render("user/signupPage");
};
const signupPost=async(req,res)=>{
    try {
        console.log(req.body)
         const {email,password,name}=req.body;
    const hash= await bcrypt.hash(password,5);
    
    const user =new User({
        name:name,
        email:email,
        password:hash,

    })
    await user.save();
    res.redirect("/login")
    } catch (err) {
        console.log("email already exits");
        res.redirect("/signup")
        
    }
   

    // console.log("insider req .body ",email,password,name);
};

const loginPost= async(req,res)=>
{
    console.log("dey inside loginpost")
    const {email,password}=req.body;
    const user=await User.findOne({email});
    const validPass= await bcrypt.compare(password,user.password);
    if(validPass){
        res.redirect("/");
        
    }
    else{
    res.redirect("/login");
    }
}
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
// exports.googleAuth=googleAuth;
exports.loginPost=loginPost;
exports.signupPost=signupPost;
exports.loginPage = loginPage;
exports.signupPage = signupPage;