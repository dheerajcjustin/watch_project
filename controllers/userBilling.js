const Product = require("../models/productModel");
const Category=require("../models/categoryModel");
const Brand=require("../models/brandModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const { findById } = require("../models/userModel");
const Order =  require("../models/orderModel");
let meg = "";

const mongoose=require("mongoose");
const { merge } = require("../routes/userRoutes");
const Coupon = require("../models/couponModel");
const { findOne } = require("../models/cartModel");

const checkoutPage = async (req, res) => {
    
    let grandTotal = 0
    
        let name="false";

        let userid=req.session.username;
        userid=mongoose.Types.ObjectId(userid);


    if(req.session.NameOfUser)
    { 
        name=req.session.NameOfUser;
        let userid = req.session.username;
        userId = mongoose.Types.ObjectId(userid);
        
    }
   let  address= await User.findById(userid,{address:1,_id:0,couponCode:1});
   
   let couponCode;
   
   address = address.address;
//    console.log("address",address);
   let items;
   let code;
   couponCode=await Cart.findOne({userId},{couponCode:1,_id:0})
   if(couponCode)
   {
       console.log("the id is " ,couponCode.couponCode)
       
        code=await Coupon.findById(couponCode.couponCode)
       console.log("coupon code delites object id  ",code);
   }


     items=await Cart.aggregate([
        { $match:{userId}},
        {$unwind:"$cartItems"},
        {$project: {
           item: '$cartItems.productId',
           itemQuantity: '$cartItems.productQuatity',
          itemSize: '$cartItems.productSize',
            itemProductId: "$cartItems._id",
            price:"$price",
            
          
        }},
        {
          $lookup:{
               from:"products",
               localField: 'item',
               foreignField: '_id',
               as: 'product'

          }
        }
     ])
     let price;
    
    if (items.length<1)
    {   
        price=0
        meg="empty cart"
        req.flash('message',  'empty cart');
        res.redirect("/cart")
    }
    else {
        price = items[0].price;
        // console.log("grand total ",price)
    }
    
       


    res.render("user/checkout.ejs", { name, address, items, meg ,price,code})
    meg = "";


}
exports.checkoutPage=checkoutPage;


// adding address
const addressPost=async(req,res)=>{
    userid=req.session.username;
    const {name,address,town,state,country,pin,phone,email}=req.body;
    await User.findByIdAndUpdate(userid, { $push: { address: { name, address, town, state, country, pin, phone,email} } });  
    res.redirect("back")
     }
exports.addressPost = addressPost;


// edditing the address
const addressedit = async (req, res) => {
   let userid = req.session.username;
    userId = mongoose.Types.ObjectId(userid);
    
    const { name, address, town, state, country, pin, phone,email } = req.body;
    let { index } = req.body;
    index = mongoose.Types.ObjectId(index);
    await User.findOneAndUpdate({ userId, "address._id": index }, { $set: { "address.$.name": name,"address.$.address": address,"address.$.town": town,"address.$.state": state,"address.$.country": country,"address.$.pin": pin,"address.$.phone": phone,"address.$.email": email } });
    
  
    res.redirect("back")
    
}
exports.addressedit = addressedit;


const orderRedirect =async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.session.username);

    
    
   
        let addresId = mongoose.Types.ObjectId(req.body.addressIndex);
        let orderItems= await Cart.findOne({ userId }, { _id: 0, cartItems: 1, price: 1,couponCode:1 });        
        if(orderItems.couponCode){
            let couponCheck= await Coupon.findById(orderItems.couponCode)
        console.log("coupon check in redirect page",couponCheck);
        bill= orderItems.price-(orderItems.price*couponCheck.discountPercentage/100);
        console.log(bill)
        

        }else{
            console.log("coupon is node found");
            bill = orderItems.price;
        }
        orderItems = orderItems.cartItems;
        if (orderItems.length > 0) {
            // console.log("order items in cod cart items ", orderItems)
            let orderAddress = await User.aggregate([
                { $match: { _id: userId } },
                { $unwind: "$address" },
                { $match: { "address._id": addresId } }
            ])
            orderAddress = orderAddress[0].address;
            orderAddress = orderAddress.name + "," + orderAddress.address + "," + orderAddress.town + "," + orderAddress.state + "," + orderAddress.country + "," + "Pin:" + + orderAddress.pin + "," + "phone" + orderAddress.phone;
            const paymentType = req.body.paymentType;
            let deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 7);
            deliveryDate = deliveryDate.toLocaleDateString();
           let  paymentStatus="pending"
           console.l
        
        
        
            let newOrder = new Order({ userId, orderItems, orderAddress, bill, paymentType, deliveryDate,paymentStatus });
            try {
                await newOrder.save();
                await Cart.findOneAndUpdate({ userId }, { $unset: { "cartItems": "" } });
                await Cart.findOneAndUpdate({ userId }, { $unset: { "price": "" } });

            
            
            } catch (err) {
                console.log(err)
            
            }
        

            res.redirect("/MyOrder")

        
        
        } else {
            meg = "add or select address"
            res.redirect("/checkout")
        }
   

}
exports.orderRedirect = orderRedirect;

const orderPage = async(req, res) => {
    let name ;
        
    if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
        // console.log(name)
        let userid = req.session.username;
        userId = mongoose.Types.ObjectId(userid);
        
    }
    // const myOrders = await Order.find({ userId,paymentStatus:{$in:["done","COD"]}})
     const myOrders = await Order.find({ userId})

    // console.log("Inna nite orders ", myOrders);
    

    res.render("user/order.ejs",{name,myOrders})
    
}
exports.orderPage = orderPage;




const   viewOrder =async (req, res) => {
    let name ;
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    console.log(" order id ", id);;
    

        
    if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
        let userid = req.session.username;
        userId = mongoose.Types.ObjectId(userid);
        
    }
    // const test=await Order.aggregate([
    //     { $match: { _id:id } },
        
        
    // ]);

    const items = await Order.aggregate([
        { $match: { _id:id } },
        { $unwind: "$orderItems" },
        {
            $project: {
                item: '$orderItems.productId',
                itemQuantity: '$orderItems.productQuatity',
                itemSize: '$orderItems.productSize',
                itemProductId: "$orderItems._id",
                bill:"$bill",
          
            }
        },
        {
            $lookup: {
                from: "products",
                localField: 'item',
                foreignField: '_id',
                as: 'product'

            }
        }
    ]);
    console.log("items in orders",items);


    

    res.render("user/viewOrder.ejs", { name, items });

    
}
exports.viewOrder = viewOrder;


