const Cart =require("../models/cartModel")
const Order = require("../models/orderModel");
const User = require("../models/userModel")
const mongoose = require("mongoose");
const Coupon = require("../models/couponModel");
const dateFormat=require("../utils/stringtoDate");
const { findOneAndUpdate } = require("../models/cartModel");

const adminCouponPage = async(req, res) => {
    // res.send("hai");
    const coupons=await Coupon.find();
    console.log(coupons);

    res.render("admin/adminCoupon",{message:req.flash('message'),coupons});
}
exports.adminCouponPage = adminCouponPage;

//adding coupon 

const couponAdd=async(req,res)=>{
   
    let {expDate,minAmount,couponCode,discountPercentage}=req.body;
    expDate=dateFormat.stringToDate(expDate,"yyyy-mm-dd","-");
    console.log(expDate);

    let cop= await Coupon.findOne({couponCode});

    console.log("hai mounse inside featch");
    let add;
    let error="";
  
    if(cop){
        console.log("user name is exits",cop);
         add=false;
         error="cupon exites "+cop;
         req.flash('message', "couop name is exits");

         res.redirect("/admin/coupon");

         
        
      
        
    }else{
        
        const coupon= new Coupon({expDate,minAmount,couponCode,discountPercentage});
        try {
             await coupon.save();
            add=true;
            res.redirect("/admin/coupon");

           
        } catch (err) {
            console.log(err);
           
            req.flash('message', "someting is worng");
            res.redirect("/admin/coupon");
            add=false
          
        }
    }
   
   
   
}
exports.couponAdd=couponAdd;

const couponDelete=async(req,res)=>{
    console.log("delete ayye");
    console.log(req.body);
    let isDelete;
    const id=mongoose.Types.ObjectId(req.body.id);
    try {
        await Coupon.findByIdAndDelete(id)
        isDelete=true;

    } catch (err) {
        console.log(err);
        isDelete=false;
        
    }

    res.send({isDelete})
    
}
exports.couponDelete=couponDelete;

const couponApply=async(req,res)=>{
    
    
     const userId=mongoose.Types.ObjectId(req.session.username)  
     console.log("user id is ",userId);
    let couponSuccess ;
    let meg="";
    const couponCode=req.body.couponCode
    console.log("the body data is ",couponCode);
    const couponCheck=await Coupon.findOne({couponCode})
    const cart=await Cart.findOne({userId})
    console.log("the couponCheck is ",couponCheck);
    console.log("the cart  is ",cart);
    let bill;

    
    if(couponCheck){
        if(cart.price>=couponCheck.minAmount)
        {
            couponSuccess =true;
            let id=couponCheck._id;
            meg="successs "
            
             await Cart.updateOne({userId},{$set:{couponCode:id}})
            console.log("cart is  final check",cart);
            bill=cart.price*couponCheck.discountPercentage/100;
 

        }else{
            
            console.log("minimum amount low");
            couponSuccess=false;
            meg="minimum amount low"
            
        }
    }    
    else{
        couponSuccess =false;
        meg="invalid couponcode"
    }


    res.send({couponSuccess,meg,couponCheck,bill})
}
exports.couponApply=couponApply;