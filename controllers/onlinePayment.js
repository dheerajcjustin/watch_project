const Razorpay = require('razorpay')
const Cart =require("../models/cartModel")
const Order = require("../models/orderModel");
const User = require("../models/userModel")
const mongoose = require("mongoose");
const crypto = require("crypto");

let instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET })

const razorpayPayment = async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.session.username);
    const addresId = mongoose.Types.ObjectId(req.body.addressIndex);
    let orderItems = await Cart.findOne({ userId }, { _id: 0, cartItems: 1, grandTotal: 1 });
    
    let bill = 0;
     bill = orderItems.grandTotal;
    orderItems = orderItems.cartItems;
    let paymentType = req.body.paymentType;
    let   deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    deliveryDate = deliveryDate.toLocaleDateString();
    
    console.log("bill ",bill);
    
    let mail = await User.findById(userId);
    mail = mail.email;
    //to find address
    let billAddress = await User.aggregate([
        { $match: { _id: userId } },
        { $unwind: "$address" },
        { $match: { "address._id": addresId } }
    ])
    console.log("address is ", billAddress);
    
    billAddress = billAddress[0].address;     
    let orderAddress =  billAddress.name +","+ billAddress.address+"," + billAddress.town+"," + billAddress.state +"," + billAddress.country +","+ "Pin:"+ + billAddress.pin +","+ "phone" + billAddress.phone;     
    console.log("inside razorpay ")
    
    
    let newOrder = new Order({ userId, orderItems, orderAddress, bill, paymentType, deliveryDate });
    try {
                  await newOrder.save();
        //   await Cart.findOneAndUpdate({ userId }, { $unset: { "cartItems":""} });
                 
                 
              } catch (err) {
                console.log(err)
                 
             }

    let insertId = newOrder._id;
    const options = {
        amount: bill, // amount in the smallest currency unit
        currency: "INR",
        receipt: "" + insertId
    };
    
   

  const order = await instance.orders.create({
  amount: bill*100,
  currency: "INR",
  receipt: "receipt#1",
  notes: {
    key1: "value3",
    key2: "value2"
  }
})

    orderId = order.id;

    const userDetails = {
        fullName: billAddress.name,
        mobile: billAddress.phone,
        email: mail
    };
    // await instance.orders.create(options, function (err, order) {
    //     console.log("order", order)
    //     const orderId = order.id;
    // })
       
        res.send({
            options,
            userDetails,
            orderId
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

        
        res.send({paymentStatus:'success',payDetails});
    } else {
    await Order.findByIdAndUpdate(successOrderId,{paymentStatus:"fail"});
        
        res.send({paymentStatus:'fail'});
}
}
exports.checkPayment = checkPayment;


//     
    
    
exports.razorpayPayment = razorpayPayment;





