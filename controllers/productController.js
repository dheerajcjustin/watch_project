const Product = require("../models/productModel");
const Category=require("../models/categoryModel");
const Brand=require("../models/brandModel");
const { find, findById } = require("../models/productModel");

const productPage=async(req,res)=>{
    const category=await Category.find({});
    const brand=await Brand.find();
    
    res.render("admin/adminProduct",{brand,category});
}
exports.productPage=productPage;

const subcategorySelect=async(req,res)=>{
    let id=req.body.categoryId;
    const newCategory =await Category.findById(id);
    const subcategory=newCategory.subcategory;
    res.send({subcategory})


}
exports.subcategorySelect=subcategorySelect;

const productPost=(req,res)=>{
    console.log(req.body,req.files)
    console.log("inside the product submition")
    const newProduct=new Product;
    res.send(req.files);

}
exports.productPost=productPost;