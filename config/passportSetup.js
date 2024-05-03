// const passport=require('passport')
// const session = require('express-session');
// const GoogleStrategy =require('passport-google-oauth20');
// const passportLocal=require("passport-local");
// const keys=require("./keys")
// const User=require("../models/userModel");



// // passport.serializeUser(User.serializeUser())
// // passport.deserializeUser(User.deserializeUser()) 

 

// passport.use(new GoogleStrategy ({
//     callbackURL:"/auth/googleCb", 
//     clientID:keys.google.client_id,
//     // clientID:"322087074163-987n9ugq3i924vhvretrisfeerpn0heo.apps.googleusercontent.com",
//     clientSecret:"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",
//     // ClientSecret:keys.google.client_secret,
//     // passReqToCallback:true

// },(request,accessToken, refreshToken, profile, done)=>{    //passport call back

//     console.log("the user wowow ",profile.name.givenName);
//      User.findOne({googleId:profile.id}).then((crrrentUser)=>{
//         if(crrrentUser)
//         {
//             console.log("user is ",crrrentUser);
//             //if user already exitews
//             //  request.session.userId = crrrentUser._id;
//             done(null,crrrentUser)
//         }else
//         {
//             new User({firstName:profile.name.givenName,lastName:profile.name.familyName,googleId:profile.id,email:profile.emails[0].value}).save().then((newUser)=>{
//          console.log("new user created ",newUser);})
//                     //   request.session.userId = newUser._id;

//          done(null,newUser);    
            
//         }
        
//      })      

// })
// )
  