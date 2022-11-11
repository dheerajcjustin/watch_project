const mongoose = require("mongoose");

const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const WishlistScema=new schema({
  userId:ObjectId,  
  products:[ObjectId],  

});


const Wishlist = mongoose.model("Wishlist",WishlistScema)
module.exports=Wishlist;