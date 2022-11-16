// const  passport  = require("passport");
// const passportSetup=require("../config/passportSetup")
const User=require("../models/userModel");
const Admin=require("../models/adminModel")
const bcrypt=require("bcrypt");
const nodemailer = require("nodemailer");
// const { session } = require("passport");
const { default: mongoose } = require("mongoose");
 


    let email;



// const mailOptions = {
//     from: "royalmobiles@gmail.com",
//     to: req.body.email,
//     subject: "Otp for registration is: ",
//     html: `<h3>Enter OTP to varify your email address and complete signup process</h3><h1>${otp}</h1>`, // html body
//   };

let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,    
    auth: {
      user: 'watchprojectdheeraj@zohomail.in',
      pass: 'Dcj@94node',
    }
    
});
let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

const otpSend=(req,res)=>{   
   
    email=req.body.email
    console.log("the req.body is ",req.body);
    console.log("the mail is ",email);
    let otpSuccess=true;
    const mailOptions = {
        from: "watchprojectdheeraj@zohomail.in",
        to: email,
        subject: "Otp for registration is: ",
        html: `<h3>Enter OTP to varify your email address and complete signup process</h3><h1>${otp}</h1>`, // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            otpSuccess=false
        }
        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
       

        res.send({otpSuccess});
    });   
}
exports.otpSend=otpSend;


const otpVerify= async(req,res)=>{
    console.log("req.body otp ",req.body.otp,"; the real otp",otp)
    let otpVerified;
    if (req.body.otp == otp) { 
        otpVerified=true;       
          await User.findOneAndUpdate({email},{$set:{emailVerified:true}})          
        res.send(otpVerified);

    }
    else {
        otpVerified=false;
        res.send(otpVerified);
        
    }
}
exports.otpVerify=otpVerify;

const otpResend=(req,res)=>{
    console.log("inside user otp resend");
      let resendOtp=true;
      console.log("email");
      const mailOptions = {
        from: "watchprojectdheeraj@zohomail.in",
        to: email,
        subject: "Otp for registration is: ",
        html: `<h3>Enter OTP to varify your email address and complete signup process</h3><h1>${otp}</h1>`, // html body
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            resendOtp=false
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send(resendOtp);
    });

}
exports.otpResend=otpResend;

const signupPost=async(req,res)=>{
    try {
        console.log(req.body)
         const {email,password,name}=req.body;
    const hash= await bcrypt.hash(password,5);
    
    const user =new User({
        name:name,
        email:email,
        password:hash,
        emailVerified:false



    })
    await user.save();
    res.send({signup:true})
    } catch (err) {
        
        res.send({signup:false,meg:"user already exits"})
    }
   

    // console.log("insider req .body ",email,password,name);
};

const loginPost= async(req,res)=>
{
    let login;
    const {email,password}=req.body;
    console.log("email and passwoed")
    console.log(email,password)
    console.log("email and passwoed")

    const user=await User.findOne({email});
    if(user){
    const validPass= await bcrypt.compare(password,user.password);
    if(validPass){
       console.log("login succes")
        req.session.username = user._id;
        req.session.NameOfUser=user.name; 
        req.session.save(function(err) {})
        console.log(req.session);
        login=true;
    }
    else{
        login=false;
    }
}
else{
    login=false;
}
    res.send({login})
    
}
//  const googleAuth=()=>(passport.authenticate("google",{
//     scope:['email','profile'] 

//   }));
   
// const googleCb=()=>{passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
     
// })};

const logout=(req,res,next)=>{
    

       req.session.destroy();
    res.redirect('/')
  
}
//exports.googleCb=googleCb;
exports.logout=logout;
// exports.googleAuth=googleAuth;
exports.loginPost=loginPost;
exports.signupPost=signupPost;


const editPassword=async(req,res)=>{
    console.log("hai");
    const user=await User.findById(req.session.username);
    const id=mongoose.Types.ObjectId(req.session.username);
    const {newPass,oldPass}=req.body;
    const validPass= await bcrypt.compare(oldPass,user.password);
    if (validPass) {
        console.log("valid pass");
     const password= await bcrypt.hash(newPass,5);
     console.log(password)
        await User.findByIdAndUpdate(id,{password})
     
    }


    
    res.send(validPass);
}
exports.editPassword=editPassword;
