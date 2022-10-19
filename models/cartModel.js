const mongoose = require("mongoose");

const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const cartScema=new schema({
  userId: ObjectId, 
  cartItems:[ {
    productId:ObjectId,
    productSize:{type:String,default:"s"},
    productQuatity:{type:Number,default:1}
  }],
});


const Cart = mongoose.model("Cart",cartScema)
module.exports=Cart;