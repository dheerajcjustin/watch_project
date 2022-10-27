const mongoose = require("mongoose");

const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const cartScema=new schema({
  userId:ObjectId,
  cartItems:[{
    productId:ObjectId,
    productSize:{type:String,default:"small"},
    productQuatity:{type:Number,default:1}
      }],
  grandTotal: { type: Number, default: 0 }
});


const Cart = mongoose.model("Cart",cartScema)
module.exports=Cart;