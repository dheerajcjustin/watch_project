const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const productScema=new schema({
  name: { type: String, required: true, trim: true },
  desc: { type: String },
  categoryId:ObjectId,
  subcategoryIndex:{type:Number},
  brandId:ObjectId,
  price:{type:Number},
  mrp:{type:Number},
  stocks:
    {
        small:{
        type:Number,
        },
        medium:{type:Number,
        },
        large:{type:Number}
    }
  ,

   phots:[{
        url:String,
        filename:String
    }]
})
productScema.plugin(findOrCreate)


const Product = mongoose.model("Product",productScema)
module.exports=Product;