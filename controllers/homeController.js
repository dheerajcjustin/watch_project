const mongoose=require("mongoose");
const Coupon = require("../models/couponModel");
const Product = require("../models/productModel");
const Category=require("../models/categoryModel");
const Brand=require("../models/brandModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order =  require("../models/orderModel");
const Carousel=require("../models/carouselModel");
const BannerCard=require("../models/bannerCardsModel")

const homePage=async(req,res)=>{

    let name;
    const carousel=await Carousel.findOne();
    const card=await BannerCard.findOne();
    if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;        
    }    
    res.render("user/homePage",{name,carousel,card});
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
            //  console.log(orderGroup);
            let types=[]
             let hai= orderGroup.find(m=>m._id=='packed')
             if(hai)
             {
                types.push(hai.count);
             }
             else{
                types.push(0);
             }
              hai= orderGroup.find(m=>m._id=='shipped')
             if(hai)
             {
                types.push(hai.count);
             }
             else{
                types.push(0);
             } hai= orderGroup.find(m=>m._id=='ordered')
            
             if(hai)
             {
                types.push(hai.count);
             }
             else{
                types.push(0);
             }
              hai= orderGroup.find(m=>m._id=='delivered')
             if(hai)
             {
                types.push(hai.count);
             }
             else{
                types.push(0);
             }
              hai= orderGroup.find(m=>m._id=='packed')
             if(hai)
             {
                types.push(hai.count);
             }
             else{
                types.push(0);
             }

              sales=sales.map(price=>(Number(price.totalPrice)))   
     orderGroup=orderGroup.map(img=>(Number(img.count)))
    
     if(totalSaels[0]?.totoal){
     totalSaels=Math.round(totalSaels[0].totoal);
     }else{
        totalSaels=0
     }

     const pending=await Order.find({status:{$in:['ordered','shipped','packed']}}).limit(2)



     let brandwise=await Order.aggregate([
        {$unwind:"$orderItems"},
        {$project:{
            _id:0,
            product:"$orderItems.productId",
            size:"$orderItems.productQuatity"            
        }
        },
        {
            $lookup:{
                from:"products",
                localField:"product",
                foreignField:"_id",
                as:"proDeitels"
            }
            
        },
        {
            $group:{
                _id:{brand:"$prodeitels[0].brandId"}
            }            
        }         
     ])
    //  console.log("brand wise",brandwise);

    orderGroup= types
    
    res.render("admin/adminHome",{productCount,userCount,orderGroup,sales,totalSaels,pending});
};
exports.adminHomePage = adminHomePage;

const listProducts=async(req,res)=>{
    let name;
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
         const product=await Product.aggregate([
            {$sort:{price:1}},
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
         }},{$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }}
    ])
    let brands=await Product.aggregate([
        {$group:{
            _id:{brand:"$brandId"}
        }},{
            $lookup:{ from:"brands",
            localField:"_id.brand",
            foreignField:"_id",
            as:"brand"

            }
        }
    ])
    let material=await Product.aggregate([
        {$group:{
            _id:{material:"$materialId"}
        }},
        {$match:{"_id.material":{$ne:null}}},
        {
            $lookup:{ from:"materials",
            localField:"_id.material",
            foreignField:"_id",
            as:"materials"

            }
        }
    ])

    // sales=sales.map(price=>(Number(price.totalPrice)))
    // console.log("start brands");
    //  console.log(brands[0]._id)
    // console.log("end brands");

    // for (const iterator of brands) {
    //     console.log("hai")
    //     console.log(brands);
        
  
     // 
    //  ,number.brand[0].name
   

    material=material.map(number=>({id:number._id.material,materialName:number.materials[0].name}))   
    brands=brands.map(number=>({id:number._id.brand,brandName:number.brand[0].name}))
  

        



         
    // } catch (err) {
         // console.log(err)
    // }

    res.render("./user/productPage",{product,name,brands,material})
}
exports.listProducts=listProducts;


const mensProduct=async(req,res)=>{

    let name;
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
         let categoryId="66360bb3dd9728039dd0d6c7"
         let gender='"66360bb3dd9728039dd0d6c7';
         try {
             categoryId=mongoose.Types.ObjectId(categoryId)
            
         } catch (error) {
            console.log("catergor ty pe erre");
            
         }
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
         }},{
            $lookup:
            { from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"

        }
        }

    ])
    let brands=await Product.aggregate([
        {
            $match:{categoryId}
        },
        {$group:{
            _id:{brand:"$brandId"}
        }},{
            $lookup:{ from:"brands",
            localField:"_id.brand",
            foreignField:"_id",
            as:"brand"

            }
        },
    ])
    let material=await Product.aggregate([
        {
            $match:{categoryId}
        },
        {$group:{
            _id:{material:"$materialId"}
        }},
       
        {
            $lookup:{ from:"materials",
            localField:"_id.material",
            foreignField:"_id",
            as:"materials"

        }
        }
    ])
    
    material=material.map(number=>({id:number._id.material,materialName:number.materials[0].name}))   
    brands=brands.map(number=>({id:number._id.brand,brandName:number.brand[0].name}))
   
    

    res.render("./user/genderProducts.ejs",{product,name,material,brands,gender})
}
exports.mensProduct = mensProduct;



const womensProduct=async(req,res)=>{

    let name;
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
       try {
           userId = mongoose.Types.ObjectId(userid);
        
       } catch (error) {
        
       }
       
   }
   // const myOrders = await Order.find({ userId,paymentStatus:{$in:["done","COD"]}})
    // const myOrders = await Order.find({ userId})
    // try {
         // const product =await Product.find();
         // console.log(product);
         let categoryId="66360bbadd9728039dd0d6cb"
         let gender=categoryId;
         try {
             categoryId=mongoose.Types.ObjectId(categoryId)
            
         } catch (error) {
            
         }
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
         }},{
            $lookup:
            { from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"

        }
        }

    ])
    let brands=await Product.aggregate([
        {
            $match:{categoryId}
        },
        {$group:{
            _id:{brand:"$brandId"}
        }},{
            $lookup:{ from:"brands",
            localField:"_id.brand",
            foreignField:"_id",
            as:"brand"

            }
        },
    ])
    let material=await Product.aggregate([
        {
            $match:{categoryId}
        },
        {$group:{
            _id:{material:"$materialId"}
        }},
       
        {
            $lookup:{ from:"materials",
            localField:"_id.material",
            foreignField:"_id",
            as:"materials"

        }
        }
    ])
    
    material=material.map(number=>({id:number._id.material,materialName:number.materials[0].name}))   
    brands=brands.map(number=>({id:number._id.brand,brandName:number.brand[0].name}))
    

    res.render("./user/genderProducts.ejs",{product,name,material,brands,gender})
}

exports.womensProduct = womensProduct;

