const mongoose=require("mongoose"); 
// const passportLocalMongoose=require("passport-local-mongoose")

const schema = mongoose.Schema;

const userSchema = new schema({
  googleId:{type:Number},
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    required: [true,"email is canot be balnk"], 
    unique: true,
    trim: true,
  },
  password:{type:String,trim:true},
  address:[{
    name:{type:String},
    email:{type:String},
    address:{type:String},
    town:{type:String},
    state:{type:String},
    country:{type:String},
    pin:{ type:String   },
    phone:{type:Number}



  }]
  

 },{timestamps:true});
// userSchema.plugin(passportLocalMongoose);
 module.exports


const User = mongoose.model("User", userSchema);
module.exports = User;