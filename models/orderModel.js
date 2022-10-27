const mongoose = require("mongoose");

const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const orderScema = new schema({
  userId: ObjectId,
  orderItems: [{
    productId: ObjectId,
    productSize: { type: String, default: "small" },
    productQuatity: { type: Number, default: 1 }

  }],
  orderAddress: { type: String },
  bill: { type: Number },
  paymentType: { type: String, enum: ["COD", "razorpay"], default: "COD" },
  paymentStatus:{type:String,enum:["COD","fail","done"]},  
  status: {
    type: String, enum: ["ordered", "packed", "shipped", "delivered", "cancelled"],
    default: "ordered",
  },
  deliveryDate: { type: String },
  transationId:{type:String}
    

    

},{timestamps:true});


const Order = mongoose.model("Order",orderScema)
module.exports=Order;