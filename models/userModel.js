const mongoose=require("mongoose"); 

const schema = mongoose.Schema;

const userSchema = new schema({
  googleId:{type:Number},
  firstName: { type: String, required: true, trim: true },

  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: { type: String,  trim: true },

 });

const User = mongoose.model("User", userSchema);
module.exports = User;