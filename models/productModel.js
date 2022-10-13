const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;

const productScema=new schema({
    Name: { type: String, required: true, trim: true },
  decs: { type: String },
  subcategory:[String],
})
categoryScema.plugin(findOrCreate)


const Product = mongoose.model("Product",productScema)
module.exports=Product;