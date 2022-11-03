const mongoose=require("mongoose");
const Coupon = require("../models/couponModel");
const Product = require("../models/productModel");
const Category=require("../models/categoryModel");
const Brand=require("../models/brandModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order =  require("../models/orderModel");

const homePage=async(req,res)=>{

    let name="";
    if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
        console.log(name)
    }
   
    res.render("user/homePage",{name});
};
exports.homePage = homePage;

const adminHomePage=async(req,res)=>{

    const userCount=await User.find().count() 
    const productCount=await Product.find().count()

    let orderGroup=await Order.aggregate([
        {
        $group:{
            _id:"$status", count: { $count: { } }
        }

        },
    ])
    let totalSaels=await Order.aggregate([
        {
        $group:{
            _id:null, totoal: { $sum:"$bill" }
        }

        },
    ])
    let sales=await Order.aggregate(
        [
           {
             $group : {
                _id : { month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" }, year: { $year: "$createdAt" } },
                totalPrice: { $sum: '$bill' },
                count: { $sum: 1 }
    
                     }
    
                   },{$sort:{_id:-1}},
                   {$project:{totalPrice:1,_id:0}},{$limit:7}
                ]
             );
              sales=sales.map(price=>(Number(price.totalPrice)))
   
     orderGroup=orderGroup.map(img=>(Number(img.count))) 
     totalSaels=Math.round(totalSaels[0].totoal);

     const pending=await Order.find({status:{$in:['ordered','shipped','packed']}}).limit(2)
     
     
     

    console.log("totl group",pending);

    


    

    res.render("admin/adminHome",{productCount,userCount,orderGroup,sales,totalSaels,pending});
};
exports.adminHomePage = adminHomePage;

const listProducts=async(req,res)=>{
    let name="false"
    if(req.session.NameOfUser)
   {
       name=req.session.NameOfUser;
    //    console.log(name)
   }
    if(req.session.NameOfUser)
   {
       name=req.session.NameOfUser;
       // console.log(name)
       let userid = req.session.username;
       userId = mongoose.Types.ObjectId(userid);
       
   }
   // const myOrders = await Order.find({ userId,paymentStatus:{$in:["done","COD"]}})
    // const myOrders = await Order.find({ userId})
    // try {
         // const product =await Product.find();
         // console.log(product);
         const product=await Product.aggregate([{$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
              from:"categories",
              localField:"categoryId",
              foreignField:"_id",
              as:"category"
         }}
    ])
         console.log("categories",product[0].category[0].name)
         console.log("categories",product[0].brand[0].name)



         
    // } catch (err) {
         // console.log(err)
    // }

    res.render("./user/productPage",{product,name})
}
exports.listProducts=listProducts;


const mensProduct=async(req,res)=>{

    let name="false"
    if(req.session.NameOfUser)
   {
       name=req.session.NameOfUser;
    //    console.log(name)
   }
    if(req.session.NameOfUser)
   {
       name=req.session.NameOfUser;
       // console.log(name)
       let userid = req.session.username;
       userId = mongoose.Types.ObjectId(userid);
       
   }
   // const myOrders = await Order.find({ userId,paymentStatus:{$in:["done","COD"]}})
    // const myOrders = await Order.find({ userId})
    // try {
         // const product =await Product.find();
         // console.log(product);
         let categoryId="634971763cd76623bced6758"
         categoryId=mongoose.Types.ObjectId(categoryId)
         const product=await Product.aggregate([
            {
                $match:{categoryId}
            },
            {$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
              from:"categories",
              localField:"categoryId",
              foreignField:"_id",
              as:"category"
         }}
    ])
         console.log("categories",product[0].category[0].name)
         console.log("categories",product[0].brand[0].name)



    res.render("./user/productPage",{product,name})
}
exports.mensProduct = mensProduct;



const womensProduct=async(req,res)=>{

    let name="false"
    if(req.session.NameOfUser)
   {
       name=req.session.NameOfUser;
    //    console.log(name)
   }
    if(req.session.NameOfUser)
   {
       name=req.session.NameOfUser;
       // console.log(name)
       let userid = req.session.username;
       userId = mongoose.Types.ObjectId(userid);
       
   }
   // const myOrders = await Order.find({ userId,paymentStatus:{$in:["done","COD"]}})
    // const myOrders = await Order.find({ userId})
    // try {
         // const product =await Product.find();
         // console.log(product);
         let categoryId="6349641f85c66be078f00005"
         categoryId=mongoose.Types.ObjectId(categoryId)
         const product=await Product.aggregate([
            {
                $match:{categoryId}
            },
            {$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
              from:"categories",
              localField:"categoryId",
              foreignField:"_id",
              as:"category"
         }}
    ])
         console.log("categories",product[0].category[0].name)
         console.log("categories",product[0].brand[0].name)



    res.render("./user/productPage",{product,name})
}
exports.womensProduct = womensProduct;

