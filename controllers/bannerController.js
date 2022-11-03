const Banner1=require("../models/banner-1Model")


const bannerPage=async(req,res)=>{

    let meg=""
   
    res.render("admin/adminBanner.ejs",{meg});
};
exports.bannerPage = bannerPage;


const banner1Post= async(req,res)=>{
     
    console.log(req.body,req.files)
    
    // console.log("req.body",req.body);
      
        //      let banner=   req.files.map(img=>({url:img.path,filename:img.filename}))  
        //      console.log("logos is ",logos)      
        //     //   const banner1 =  new Banner1({name:req.body.,decs:req.body.brandDesc,banner});             
             
        //      try{
        //     //     //  banner1.save().then(() => {
        //     //     console.log("brand saved")
        //     //     res.redirect("/admin/brands");
        //     //   })
        //     } catch (err) {
        // console.log("eroor ",err);

        // console.log("brand alrady exits");
        //     }
        
        
        
   

};
exports.banner1Post=banner1Post;