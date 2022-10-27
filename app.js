if(process.env.NODE_ENV !=="production"){
    require("dotenv").config();
}
console.log(process.env.SECRET);

const express=require("express");
const path= require('path');
const morgan=require("morgan");
const cors=require("cors")
const mongoose = require("mongoose"); //mongoose
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');







const userRoutes = require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
// const passportSetup=require("./config/passportSetup");
// const dbconfiq = require("./confiq/dbconfiq");

const MongoDBStore = require('connect-mongodb-session')(session);

const port = 3000;

// dbconfiq();

const app=express();
app.use(cookieParser());
const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017/watchProject",
    collection: 'sessionValues'
});

store.on('error', function (error) {
    console.log(error);
});
app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));


// app.use(passport.initialize());
// app.use(passport.session()); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("files"));


app.use(cors())

// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/public')));
app.use(methodOverride("_method"));
app.use(flash());




app.use("/admin",adminRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/watchProject")
  .then(() => {
    console.log("mongoose connceta ayye ketto");
     })
     .catch((err)=>{
      console.log("mongoose entho sean unde");

     })

 app.listen(port, () => {
      console.log(`server srt ayye on port 💖 ${port}  🌹`);
    });





 