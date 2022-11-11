const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;

const bannerCardSchmea=new schema({

    title:[{ type: String }],    
    photos:[{
        url:String,
        filename:String
    }]
   
})
// BrandScema.plugin(findOrCreate)

const BannerCard = mongoose.model("BannerCard",bannerCardSchmea)
module.exports=BannerCard;