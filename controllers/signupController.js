const loginPage = (req, res, next) => {
  
    res.render("user/loginPage");
};

const signupPage=(req,res,next)=>{

    res.render("user/signupPage");
};
const signupPost=(req,res,next)=>{
    console.log("insider req .body ", req.body);
};

const googleAuth=(req,res,next)=>{
    console.log("inside google auth");
};

const logout=(req,res,next)=>{
    res.send("logout");
}
exports.logout=logout;
exports.googleAuth=googleAuth;
exports.signupPost=signupPost;
exports.loginPage = loginPage;
exports.signupPage = signupPage;