const mongoose = require("mongoose");

const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const cartScema=new schema({
  userId:ObjectId,
  couponCode:ObjectId,  
  cartItems:[{
    productId:ObjectId,
    productSize:{type:String,default:"small"},
    productQuatity:{type:Number,default:1}
      }],
  bill: { type: Number, default: 0 },
  appliedCoupon:{type:String},
  price:{type:Number,default: 0},

});


const Cart = mongoose.model("Cart",cartScema)
module.exports=Cart;