const Order =  require("../models/orderModel");
const mongoose = require("mongoose");


const adminOrders=async(req,res,next)=>{

    const orders=await Order.find();
 
    console.log("orders are ",{orders});
    res.render("admin/adminOrders",{orders});
};
exports.adminOrders = adminOrders;

const   viewOrder =async (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    // console.log("inseidie fuction @@@@@@@@@@@@@@@@@@@@@@@@@@"+id+"33##########$$$$$$$$$$$$$$");
    
     id = mongoose.Types.ObjectId(id);
    console.log(" order id ", id);;
    

    
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
    console.log("items in orders",items[0].product);
    let product=items[0].product;
    console.log("items ",items);

    

    res.send({items});

    
}
exports.viewOrder = viewOrder;

const OrdersEdit=async(req,res)=>{
    console.log(req.body);
    let {orderStutus,paymentStatus,id}=req.body;
    let status=orderStutus;
    id = mongoose.Types.ObjectId(id);

    
    await Order.findByIdAndUpdate(id,{$set:{status,paymentStatus}});

   
    res.redirect("/admin/orders")
    
};
exports.OrdersEdit = OrdersEdit;
