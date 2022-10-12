const passport=require('passport')
const GoogleStrategy =require('passport-google-oauth20');
const keys=require("./keys")

passport.use(new GoogleStrategy ({
    callbackURL:"/auth/googleCb", 
    clientID:"322087074163-987n9ugq3i924vhvretrisfeerpn0heo.apps.googleusercontent.com",
    clientSecret:"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",
    passReqToCallback:true

},()=>{
    //passport call back
})
)
  