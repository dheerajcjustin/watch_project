const { session } = require("passport");

const homePage=(req,res,next)=>{
    let name="";
    if(req.session)
    {
        name=req.session.NameOfUser;
        console.log(name)
    }
    res.render("user/homePage",{name});
};
exports.homePage = homePage;