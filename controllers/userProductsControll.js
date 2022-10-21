const Brand = require("../models/brandModel");
const Product=require("../models/productModel")
const Category=require("../models/categoryModel");
const Cart=require("../models/cartModel");
const mongoose = require('mongoose')

const { findOne } = require("../models/brandModel");

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

const cartPage=async(req,res)=>{
     // console.log(req)
     let  userId=req.session.username    
    
      userId = mongoose.Types.ObjectId(userId);          
                      const items=await Cart.aggregate([
                            { $match:{userId}},
                            {$unwind:"$cartItems"},
                            {$project: {
                               item: '$cartItems.productId',
                               itemQuantity: '$cartItems.productQuatity',
                              itemSize: '$cartItems.productSize',
                              itemProductId:"$cartItems._id"
                            }},
                            {
                              $lookup:{
                                   from:"products",
                                   localField: 'item',
                                   foreignField: '_id',
                                   as: 'product'

                              }
                            }
                           ])
                         //  const cart=items[0];
                         // const length=items[0].productList.length;
                         // console.log("cart",cart);

                           console.log("items",items[0]);
          //     console.log("items",items[0].product[0].phots[0].url);
               res.render("./user/cart",{items});

                
         
}
exports.cartPage=cartPage;

const cartAdd=async(req,res)=>{
     

     const userId=req.session.username;
     if(userId){
     console.log("   user id    ",userId);
     const{productId,productSize,productQuatity}=req.body;
     //  const cart=await Cart.findOne([{userId}]);

        const cart = await Cart.findOne({ userId });
        if(cart){

      

       let productx = await Cart.findOne({ $and: [{ userId }, { cartItems: { $elemMatch: { productId,productSize } } }] });  
          if(productx){            
          //   console.log("use exits",productx.userId)
            await Cart.findOneAndUpdate({ $and: [{ userId }, { "cartItems.productId": productId },{"cartItems.productSize":productSize}] }, { $inc: { "cartItems.$.productQuatity": productQuatity } });
          //  console.log("prouct exites"     , productx.userId);
      }else{
           await Cart.updateOne({ userId }, { $push: { cartItems: { productId, productQuantity:productQuatity,productSize } } });
      }
     }else{
      const cart=new Cart({userId,cartItems:[{productId,productSize,productQuatity}]});
       try {
            await cart.save();
        } catch (err) {
            const msg = 'Cart adding failed';
            res.send({ msg });
        }

     //   console.log(); 
      }
          
     res.redirect("/cart")
     }else{
          res.redirect("/login");
     }
}
exports.cartAdd=cartAdd;

const cartEdit= async(req,res)=>{
      const userId=req.session.username;
     console.log("cart edit body",req.body);
     const elmId=req.body.productId;
     let value=req.body.value;
     // await Cart.findOneAndUpdate({ $and: [{ userId }, { "cartItems.productId": productId },{"cartItems.productSize":productSize}] }, { $inc: { "cartItems.$.productQuatity": productQuatity } });
       await Cart.findOneAndUpdate({$and:[{userId},{"cartItems._id":elmId}]},{ $inc: { "cartItems.$.productQuatity": value } })
       db.getCollection('myCollection').aggregate([
    {
        "$group": {
            "_id": "$Id",

            "totalValue": {
                $sum: {
                    $sum: "$messages.data.saleValue"
                }
            }

        }
    }
])


     const hai=true   
      res.send({hai})
}
exports.cartEdit=cartEdit;