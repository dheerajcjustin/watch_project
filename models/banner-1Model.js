const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;

const Banner1Scema=new schema({

    title:{ type: String },
    subTitle:{ type: String },
    decs: { type: String },
    banner:[{
        url:String,
        filename:String
    }]
   
})
// BrandScema.plugin(findOrCreate)

const Banner1 = mongoose.model("Banner-1",Banner1Scema)
module.exports=Banner1;