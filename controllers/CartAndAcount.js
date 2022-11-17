const Brand = require("../models/brandModel");
const Product=require("../models/productModel")
const Category=require("../models/categoryModel");
const Cart=require("../models/cartModel");
const mongoose = require('mongoose')
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const accountPage =async (req, res) => {
     let name;
     let address;  
     let userId;   
     if(req.session.NameOfUser)
    {
          name = req.session.NameOfUser;     
          userId = mongoose.Types.ObjectId(req.session.username);        
   
     }
     const myOrders = await Order.find({ userId,paymentStatus:{$in:["done","COD"]}}).limit(4)

     let  userDetails= await User.findById(req.session.username);
     if(userDetails.address){
           address =userDetails.address;
     }    
     res.render("./user/account",{name,address,userDetails,myOrders})     
}
exports.accountPage = accountPage;
const viewProduct=async(req,res,next)=>{
        let name;
     if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
     //    console.log(name)
    }
    let  _id
    _id=req.params.id;     
    let product;  
    try {         
          _id=mongoose.Types.ObjectId(_id)
          product =await Product.aggregate([ { $match : { _id:_id } },
               {
                    $lookup:{
                         from:"brands",
                         foreignField:"_id",
                         localField:"brandId",
                         as:"brand"
                    }
               },
               {
                    $lookup:{
                         from:"materials",
                         foreignField:"_id",
                         localField:"materialId",
                         as:"mateiral"
                    }
               },{
                    $lookup:{
                         from:"categories",
                         foreignField:"_id",
                         localField:"categoryId",
                         as:"gender"
                    }
               }])          
     } catch (error) {
          res.render("./user/errorPage.ejs");
          return next          
     }
          console.log("product",product);
          if(product.length>0){
          product=product[0];
          let relatedProducts=await Product.find({categoryId:product.categoryId}).limit(4)
          console.log("start",relatedProducts[0],"related products")          
     res.render("./user/productView",{product,name,relatedProducts})
      }
      
      else{
          res.render("./user/errorPage.ejs");
      }

}
exports.viewProduct=viewProduct;

const cartPage=async(req,res)=>{
     // console.log(req)
        let name;
     if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
     //    console.log(name)
    }
     let  userId=req.session.username    
    
      userId = mongoose.Types.ObjectId(userId);          
                      const items=await Cart.aggregate([
                            { $match:{userId}},
                            {$unwind:"$cartItems"},
                            {$project: {
                               item: '$cartItems.productId',
                               itemQuantity: '$cartItems.productQuatity',
                              itemSize: '$cartItems.productSize',
                              itemProductId: "$cartItems._id"
                              
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

                           console.log("items",items);
                           
                           let price=0;
                           for(item of items)
                           {
                              price+=item.product[0].price* item.itemQuantity
                           }
                           console.log(price);
                  await Cart.findOneAndUpdate({userId},{price})
          //     console.log("items",items[0].product[0].phots[0].url);
               res.render("./user/cart",{items,name,price, message:req.flash('message')});

                
         
}
exports.cartPage=cartPage;

const cartAdd=async(req,res)=>{
     
     
     const userId=req.session.username;
     if(userId){
          console.log("   user id    ",userId);
          const{productId,productSize,productQuatity}=req.body;
          //  const cart=await Cart.findOne([{userId}]);
          
          const cart = await Cart.findOne({ userId });
          await Cart.findOneAndUpdate({ userId }, { $unset: { "couponCode": "" } });
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
     
     const {productId,productSize,value,elmId}=req.body; 
     console.log("fetch cart product id",productId)   
     //  await Cart.findOneAndUpdate({ $and: [{ userId }, { "cartItems.productId": productId },{"cartItems.productSize":productSize}] }, { $inc: { "cartItems.$.productQuatity": value } });
        await Cart.findOneAndUpdate({$and:[{userId},{"cartItems._id":elmId}]},{ $inc: { "cartItems.$.productQuatity": value } })

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

                           console.log("items",items[0].product[0]._id);                           
                           let price=0;
                           for(item of items)
                           {
                              price+=item.product[0].price* item.itemQuantity
                           }
                           console.log("price",price);
                  await Cart.findOneAndUpdate({userId},{price})
            await Cart.findOneAndUpdate({ userId }, { $unset: { "couponCode": "" } });                          

     const hai=true   
      res.send({hai,price})
}
exports.cartEdit = cartEdit;
const cartDelete =async (req, res) => {
     const userId = mongoose.Types.ObjectId(req.session.username);
     let  itemId  = mongoose.Types.ObjectId(req.body.itemId);    
    const cartItem=  await Cart.findOne();
     await Cart.findOneAndUpdate({ userId }, { $pull: { cartItems: { _id: itemId } } });
     await Cart.findOneAndUpdate({ userId }, { $unset: { "couponCode": "" } });
     console.log("the the cart is ", cartItem);
                res.redirect("/cart");
}
exports.cartDelete = cartDelete; 