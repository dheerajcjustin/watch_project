let meg ="";
const Brand = require("../models/brandModel");
const Admin=require("../models/adminModel");
const bcrypt=require("bcrypt")

const adminLoginPage=(req,res)=>{
  res.render("admin/adminLogin")
}
const adminLoginPost=async(req,res)=>{
 
     const {email,password}=req.body;
     console.log("email password",email,password);


  
    const user=await Admin.findOne({email});
    if(user){
     const validPass= await bcrypt.compare(password,user.password);
     if(validPass){
      req.session.admin=user._id   
     
        res.redirect("/admin");
     }
    }
     else{
      res.redirect("/admin/adminlogin");
    }
  
}
exports.adminLoginPost=adminLoginPost;
exports.adminLoginPage=adminLoginPage;


const adminBrandPage= async(req,res)=>{
    let brands=await Brand.find();
    
    res.render("admin/adminBrands",{meg,brands});
    meg="";
};
exports.adminBrandPage=adminBrandPage

const adminBrandAddPost= async(req,res)=>{
     
    console.log(req.body,req.files)
    
      let result=  await Brand.findOne({name : req.body.brandName });
       if (result) {
        console.log(result)
        meg="brand already exits"
        res.redirect("/admin/brands")
        }else{
             let logos=   req.files.map(img=>({url:img.path,filename:img.filename}))  
             console.log("logos is ",logos)      
              const brand =  new Brand({name:req.body.brandName,decs:req.body.brandDesc,logo:logos});             
             
             try{
                 brand.save().then(() => {
                console.log("brand saved")
                res.redirect("/admin/brands");
              })
            } catch (err) {
        console.log("eroor ",err);

            }
        }
        
        
   

};
exports.adminBrandAddPost=adminBrandAddPost;