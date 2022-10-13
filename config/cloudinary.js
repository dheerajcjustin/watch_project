
const express = require('express');
const multer = require('multer');
 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

console.log("procces itesms",process.env.CLOUDINARY_NAME,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_SECRET)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
    folder:"brandLogo",
    allowedFromates:['jpeg','png','jpg']
    }
});
module.exports={cloudinary,storage};