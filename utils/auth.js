


const userAuth=(req,res,next)=>{
    if(req.session.username)
    {
        
            return next();
         

    }else{
        res.redirect("/")
    }
}

const adminAuth=(req,res,next)=>{
    if(req.session.admin)
    {
        console.log("inside admin auth");
        // if(req.session.userType==="admin"){
        // console.log("admin annu admin auth"); 
            return next();
        // }
    }else{

        res.redirect("/admin/adminlogin")
    }
}

exports.userAuth=userAuth;
exports.adminAuth=adminAuth;

