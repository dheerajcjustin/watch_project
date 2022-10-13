let meg ="";
const Brand = require("../models/brandModel");


const adminHomePage=(req,res,next)=>{
    res.render("admin/adminHome");
};
exports.adminHomePage = adminHomePage;

const adminBrandPage= async(req,res)=>{
    let brands=await Brand.find();
    res.render("admin/adminBrands",{meg,brands});
    meg="";
};
exports.adminBrandPage=adminBrandPage

const adminBrandAddPost= async(req,res)=>{
     
    console.log(req.body,req.files)
    
    // console.log("req.body",req.body);
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

        console.log("brand alrady exits");
            }
        }
        
        
   

};
exports.adminBrandAddPost=adminBrandAddPost;