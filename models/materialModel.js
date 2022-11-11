const mongoose = require("mongoose");


const schema = mongoose.Schema;

const materialScema=new schema({
    name: { type: String, required: true, trim: true },
 
})
const Category = mongoose.model("Material",materialScema)
module.exports=Category;