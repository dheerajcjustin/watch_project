let meg="";
// const multer=require("multer")
// const{
//     storag,
//     cloudinary
// }=require("../cloudinary/index")

// const upload=multer({
//     storage


// });
const Category = require("../models/categoryModel");
const adminCategoryPage= async(req,res)=>{
    let categorys =await Category.find();
    // res.render("",{meg,categorys});
        res.render("admin/adminCategory",{meg,categorys});

    meg='';

}
exports.adminCategoryPage=adminCategoryPage;

//form handiling
const adminCategoryAddPost= async(req,res)=>{
    console.log("req.body",req.body);
       let result=  await Category.findOne({name : req.body.categoryName });
       if (result) {
        console.log(result)
        meg="category already exits"
        res.redirect("/admin/categorys")
        }else{
             const category =  new Category({name:req.body.categoryName,decs:req.body.categoryDesc});             
             
             try{
                category.save().then(() => {
                console.log("brand saved")
                res.redirect("/admin/categorys");
             })
            } catch (err) {
        console.log("eroor ",err);

        console.log("brand alrady exits");
            }
        }
        
        
   

};
exports.adminCategoryAddPost=adminCategoryAddPost;

const categoryUpdate= async(req,res)=>{
     const { id } = req.params;
     console.log("req.body",req.body)
    console.log("req.parms",id);
    try {
       await Category.findByIdAndUpdate(id, { $set: { name: req.body.updateCategory }})
    
    } catch (err) {
        console.log("err",err)
        
    }
    res.redirect("/admin/categorys")

}
exports.categoryUpdate=categoryUpdate;

const categoryDelete= async(req,res)=>{
     const { id } = req.params;
     console.log("req.body",req.body)
    console.log("req.parms",id);
    try {
       await Category.findByIdAndDelete(id)
    
    } catch (err) {
        console.log("err",err)
        
    }
    res.redirect("/admin/categorys")

}
exports.categoryDelete=categoryDelete;


const subcategoryAdd=async(req,res)=>{
    const id=req.body.Category;
    
const value=req.body.subcategoryName;
console.log("req.body cat sub ",id,value,req.body);
   await Category.findByIdAndUpdate(id,{ $addToSet: { subcategory: value }})
    res.send("insdei req.body");
}
exports.subcategoryAdd=subcategoryAdd;