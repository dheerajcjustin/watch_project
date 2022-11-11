const Carousel=require("../models/carouselModel")
const BannerCard=require("../models/bannerCardsModel");


const bannerPage=async(req,res)=>{

    let meg=""
   
    res.render("admin/adminBanner.ejs",{meg});
};
exports.bannerPage = bannerPage;


const banner1Post= async(req,res)=>{
     
    
    console.log("req.body",req.body);
    let {title,subTitle,decs}=req.body;
    console.log(title,subTitle,decs);
    
    
    let photos=req.files.map(img=>({url:img.path,filename:img.filename}))  
    const xbanner1= await Carousel.findOne();
    if(xbanner1){
        console.log("brand alrady exits");
        
        console.log(req.body,req.files)
            await Carousel.findByIdAndUpdate(xbanner1._id,{$set:{title,subTitle,decs,photos}});
           }
           else{
               const banner1 =  new Carousel({title,subTitle,decs,photos});             
             
             try{
                   banner1.save().then(() => {
                 console.log("brand saved")
                })
            } catch (err) {
                console.log("eroor ",err);
            }
                
     
           }
            
        
           
           
           
           res.redirect("/admin/banner");

};
exports.banner1Post=banner1Post;


const bannerCard=async(req,res)=>{
    console.log("req.body and req.files",req.body,req.files);
    let photos=req.files.map(img=>({url:img.path,filename:img.filename}))
    let title=[req.body.titile1,req.body.titile2,req.body.titile3];
    console.log("titiles are",title);
    console.log("photos are",photos);
    const xbanner1= await BannerCard.findOne();
    if(xbanner1){
        console.log("brand alrady exits");
        
        console.log(req.body,req.files)
            await BannerCard.findByIdAndUpdate(xbanner1._id,{$set:{title,photos}});
           }
           else{
               const banner1 =  new BannerCard({title,photos});             
             
             try{
                   banner1.save().then(() => {
                 console.log("brand saved")
                })
            } catch (err) {
                console.log("eroor ",err);
            }
                
     
           }
            


    
    res.redirect("/admin/banner")
}
exports.bannerCard=bannerCard;