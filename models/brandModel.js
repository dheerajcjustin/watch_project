const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;

const BrandScema=new schema({
    name: { type: String, required: true, trim: true },
    decs: { type: String },
    logo:[{
        url:String,
        filename:String
    }]
   
})
BrandScema.plugin(findOrCreate)

const Brand = mongoose.model("Brand",BrandScema)
module.exports=Brand;