const bcrypt =require("bcrypt");

const signupPost=async (req,res)=>{
  const hash=await bcrypt.hash(password,5);
}
  