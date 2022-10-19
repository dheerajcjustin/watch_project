const Brand = require("../models/brandModel");
const Product=require("../models/productModel")
const Category=require("../models/categoryModel");

const listProducts=async(req,res)=>{
     // try {
          const product =await Product.find();
          console.log(product);

          
     // } catch (err) {
          // console.log(err)
     // }

     res.render("./user/productPage",{product})
}
exports.listProducts=listProducts;

const viewProduct=async(req,res)=>{
     const id=req.params.id
     console.log(id)
     const product=await Product.findById(id);
      console.log(product);

     res.render("./user/productView",{product})
}
exports.viewProduct=viewProduct;

const cartPage=(req,res)=>{
     // console.log(req)
     let  userid=req.session.username


     res.render("./user/cart");
}
exports.cartPage=cartPage;

const cartAdd=(req,res)=>{
     res.send(req.body)
}
exports.cartAdd=cartAdd;