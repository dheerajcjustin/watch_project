const cookieParser = require("cookie-parser");
const express=require("express");
const path= require('path');
const morgan=require("morgan");
const cors=require("cors")
const mongoose = require("mongoose"); //mongoose
const methodOverride = require("method-override");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");



const app=express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("files"));



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

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





