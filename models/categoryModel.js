const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;

const categoryScema=new schema({
    name: { type: String, required: true, trim: true },
  subcategory:[String],
})
categoryScema.plugin(findOrCreate)


const Category = mongoose.model("Category",categoryScema)
module.exports=Category;