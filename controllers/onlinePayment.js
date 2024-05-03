const Razorpay = require('razorpay')
const Cart =require("../models/cartModel")
const Order = require("../models/orderModel");
const User = require("../models/userModel")
const mongoose = require("mongoose");
const Coupon=require("../models/couponModel")
const crypto = require("crypto");

let instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET })

const razorpayPayment = async (req, res) => {
    console.log("inside razorpay ")
    let addresId= mongoose.Types.ObjectId(req.body.addressIndex);
    const userId = mongoose.Types.ObjectId(req.session.username);

    let orderItems= await Cart.findOne({ userId }, { _id: 0, cartItems: 1, price: 1,couponCode:1 });    
    let couponCheck;    
    if(orderItems.couponCode){
     couponCheck= await Coupon.findById(orderItems.couponCode)
    console.log("coupon check in redirect page",couponCheck);
    bill=orderItems.price*couponCheck.discountPercentage/100;   

    }else{
        console.log("coupon is node found");
        bill = orderItems.price;
    }
    // console.log("bill is ",orderItems.bill);                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

    
    orderItems = orderItems.cartItems;
    let paymentType = req.body.paymentType;
    let   deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    deliveryDate = deliveryDate.toLocaleDateString();
    
    // console.log("bill ",bill);
    
    // let mail = await User.findById(userId);
    mail = "";
    //to find address
    let billAddress = await User.aggregate([
        { $match: { _id: userId } },
        { $unwind: "$address" },
        { $match: { "address._id": addresId } }
    ])
    console.log("address is ", billAddress);
    
     billAddress = billAddress[0].address;     
     let orderAddress =  billAddress.name +","+ billAddress.address+"," + billAddress.town+"," + billAddress.state +"," + billAddress.country +","+ "Pin:"+ + billAddress.pin +","+ "phone" + billAddress.phone;    
     let paymentStatus="pending" 
    
    
    let newOrder = new Order({ userId, orderItems,orderAddress, bill, paymentType, deliveryDate,paymentStatus });
    try {
                  await newOrder.save();
                 
                 
              } catch (err) {
                console.log(err)
                 
             }

    let insertId = newOrder._id;
    const options = {
        amount: bill*100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "" + insertId
    };
    
   

  const order = await instance.orders.create({
  amount: bill*100,
  currency: "INR",
  receipt:  "" + insertId,
  notes: {
    key1: "value3",
    key2: "value2"
  }
})

    orderId = order.id;

    const userDetails = {
        fullName: billAddress.name,
        mobile: billAddress.phone,
        email: billAddress.email
    };
    // await instance.orders.create(options, function (err, order) {
    //     console.log("order", order)
    //     const orderId = order.id;
    // })
       
        res.send({
            options,
            userDetails,
            orderId,couponCheck
        });


   
}

const checkPayment = async(req, res) => {
    const { response,payDetails,userDetails,orderId } = req.body;
    let hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    hmac = hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
    hmac = hmac.digest('hex');
    // await cartModel.findByIdAndDelete(cartId);
    if(hmac == response.razorpay_signature) {
        const successOrderId = mongoose.Types.ObjectId(payDetails.receipt);
    await Order.findByIdAndUpdate(successOrderId,{paymentStatus:"done"});
   await Cart.findOneAndUpdate({ userId }, { $unset: { "cartItems":""} });

    


        
        res.send({paymentStatus:'success',payDetails});
    } else {
    await Order.findByIdAndUpdate(successOrderId,{paymentStatus:"fail"});
        
        res.send({paymentStatus:'fail'});
}
}
exports.checkPayment = checkPayment;


//     
    
    
exports.razorpayPayment = razorpayPayment;





