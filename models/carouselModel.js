const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')


const schema = mongoose.Schema;
const CarouselScema=new schema({

    title:{ type: String },
    subTitle:{ type: String },
    decs: { type: String },
    photos:[{
        url:String,
        filename:String
    }]
   
})
// BrandScema.plugin(findOrCreate)

const Carousel = mongoose.model("Carousel",CarouselScema)
module.exports=Carousel;