const mongoose = require("mongoose");

const schema = mongoose.Schema;

const adminScema=new schema({
    firstName: { type: String, required: true, trim: true },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
});

const Admin=mongoose.model("Admin",adminScema)
module.exports=Admin;