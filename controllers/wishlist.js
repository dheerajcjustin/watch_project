const Order = require("../models/orderModel");
const User = require("../models/userModel");
const mongoose=require("mongoose");

const Wishlist=require("../models/wishlistModel")
const wishlistAdd=async(req,res)=>{
  console.log("req.body",req.body);
     
     
    const userId=req.session.username;
   
         console.log("   user id    ",userId);
         let products=req.body.id;
         products=mongoose.Types.ObjectId(products)
         
         const wishlist = await Wishlist.findOne({ userId });
       if(wishlist){    
        console.log("user id wishlist unde");

      // let productx = await Cart.findOne({ $and: [{ userId }, { cartItems: { $elemMatch: { productId,productSize } } }] }); 
      let productx = await Wishlist.findOne({ $and: [{ userId }, { products }] });  

         if(productx){            
           console.log("product unde ");
          
     }else{
      console.log("puthiya push anu")
      await Wishlist.updateOne({ userId },{ $push:{products:products}  });

     }
    }else{
      console.log("new wishlist");

     const wishlist=new Wishlist({userId,products:[products]});
      try {
           await wishlist.save();
       } catch (err) {
           const msg = 'Cart adding failed';
           res.send({ msg });
       }

    //   console.log(); 
     }

    
   res.send({hai:"hai"})
}
exports.wishlistAdd=wishlistAdd

const wishlistView=async(req,res)=>{
  let name="";
  let isproduct=true;
  if(req.session.NameOfUser)
  {
      name=req.session.NameOfUser;
      // console.log(name)
      let userid = req.session.username;
      userId = mongoose.Types.ObjectId(userid);
      
  }
  
  let product=await Wishlist.aggregate([
    {$match:{userId}},
    
      {$lookup:{
        from:"products",
        localField:"products",
        foreignField:"_id",
        as:"products"
   }}
       
  ]);
  if(product[0]){
    product=product[0].products;
    isproduct=false;


  }
  console.log("product ",product);
  res.render("./user/wishlist",{product,name,isproduct})
}
exports.wishlistView=wishlistView;

const wishlistDelete = async(req,res)=>{
  let login = false;
  let name=""
  let {id} =req.body;
  if(req.session.NameOfUser)
  {
      name=req.session.NameOfUser;
      // console.log(name)
      let userid = req.session.username;
      userId = mongoose.Types.ObjectId(userid);
      
  }

  await Wishlist.updateOne({ userId },{ $pull:{products:id}  });
  
  res.send({hai:"set"})

}
exports.wishlistDelete=wishlistDelete;