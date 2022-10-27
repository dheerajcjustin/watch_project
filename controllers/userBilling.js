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

const checkoutPage = async (req, res) => {
    
    
        let name="false";

        let userid=req.session.username;
        userid=mongoose.Types.ObjectId(userid);


    if(req.session.NameOfUser)
    { 
        name=req.session.NameOfUser;
        let userid = req.session.username;
        userId = mongoose.Types.ObjectId(userid);
        
    }
   let  address= await User.findById(userid,{address:1,_id:0});
    address = address.address;
    console.log("address",address);
    let items;

     items=await Cart.aggregate([
        { $match:{userId}},
        {$unwind:"$cartItems"},
        {$project: {
           item: '$cartItems.productId',
           itemQuantity: '$cartItems.productQuatity',
          itemSize: '$cartItems.productSize',
            itemProductId: "$cartItems._id",
            grandTotal:"$grandTotal"
            
          
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
    let grandTotal = 0
    if (items.length<1)
    {   
        meg="empty cart"
    }
    req.flash('message', 'empty cart');
        res.redirect("/cart")
    
       
        

    res.render("user/checkout.ejs", { name, address, items, meg ,grandTotal})
    meg = "";


}
exports.checkoutPage=checkoutPage;


// adding address
const addressPost=async(req,res)=>{
    userid=req.session.username;
    const {name,address,town,state,country,pin,phone}=req.body;
    await User.findByIdAndUpdate(userid, { $push: { address: { name, address, town, state, country, pin, phone } } });  
    res.redirect("/checkout")
     }
exports.addressPost = addressPost;


// edditing the address
const addressedit = async (req, res) => {
   let userid = req.session.username;
    userId = mongoose.Types.ObjectId(userid);
    
    const { name, address, town, state, country, pin, phone } = req.body;
    let { index } = req.body;
    index = mongoose.Types.ObjectId(index);
    await User.findOneAndUpdate({ userId, "address._id": index }, { $set: { "address.$.name": name,"address.$.address": address,"address.$.town": town,"address.$.state": state,"address.$.country": country,"address.$.pin": pin,"address.$.phone": phone } });
    
  
    res.redirect("/checkout")
    
}
exports.addressedit = addressedit;


const orderRedirect =async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.session.username);

    
    
    if (req.body.addressIndex) {
        let addresId = mongoose.Types.ObjectId(req.body.addressIndex);
        let orderItems = await Cart.findOne({ userId }, { _id: 0, cartItems: 1, grandTotal: 1 });
        
        bill = orderItems.grandTotal;
        orderItems = orderItems.cartItems;
        if (orderItems.length > 0) {
            console.log("order items in cod cart items ", orderItems)
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
        
        
        
            let newOrder = new Order({ userId, orderItems, orderAddress, bill, paymentType, deliveryDate });
            try {
                await newOrder.save();
                await Cart.findOneAndUpdate({ userId }, { $unset: { "cartItems": "" } });
            
            
            } catch (err) {
                console.log(err)
            
            }
        

            res.redirect("/MyOrder")

        
        
        } else {
            meg = "add or select address"
            res.redirect("/checkout")
        }
    } else {
        
        res.redirect("/cart");
    }

}
exports.orderRedirect = orderRedirect;

const orderPage = async(req, res) => {
    let name = ""
        
    if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
        // console.log(name)
        let userid = req.session.username;
        userId = mongoose.Types.ObjectId(userid);
        
    }
    const myOrders = await Order.find({ userId })
    console.log("Inna nite orders ", myOrders);
    

    res.render("user/order.ejs",{name,myOrders})
    
}
exports.orderPage = orderPage;




const viewOrder =async (req, res) => {
    let name = ""
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    console.log(" order id ", id);;
    

        
    if(req.session.NameOfUser)
    {
        name=req.session.NameOfUser;
        let userid = req.session.username;
        userId = mongoose.Types.ObjectId(userid);
        
    }
    const test=await Order.aggregate([
        { $match: { _id:id } },
        
        
    ]);

    const items = await Order.aggregate([
        { $match: { _id:id } },
        { $unwind: "$orderItems" },
        {
            $project: {
                item: '$orderItems.productId',
                itemQuantity: '$orderItems.productQuatity',
                itemSize: '$orderItems.productSize',
                itemProductId: "$orderItems._id"
          
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

    console.log("order items are in orderbilling " ,test);

    

    res.render("user/viewOrder.ejs", { name, items });

    
}
exports.viewOrder = viewOrder;


