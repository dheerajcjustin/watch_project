const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;
ObjectId=schema.ObjectId;
const productScema=new schema({
    Name: { type: String, required: true, trim: true },
  decs: { type: String },
  categoryId:ObjectId,
  subcategoryIndex:{type:Number},
  brandId:ObjectId,
  productSize:[
    {
        small:{
        type:Number,
        },
        medium:{type:Number,
        },
        large:{type:Number}
    }
  ],
  price:{tyep:Number},
  mrp:{type:Number},

   phots:[{
        url:String,
        filename:String
    }]
})
productScema.plugin(findOrCreate)


const Product = mongoose.model("Product",productScema)
module.exports=Product;