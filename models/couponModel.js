const mongoose = require("mongoose");

const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const CouponScema = new schema({
    couponCode: { type: String,trim:true},   
    discountPercentage: { type: Number },
    minAmount:{type:Number},
    expDate:{type:Date},
    userId:[{type:ObjectId}]
  
   
});


const Coupon = mongoose.model("Coupon",CouponScema)
module.exports=Coupon;