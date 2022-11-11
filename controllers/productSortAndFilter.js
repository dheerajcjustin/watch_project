const Brand = require("../models/brandModel");
const Product=require("../models/productModel")
const Category=require("../models/categoryModel");
const Cart=require("../models/cartModel");
const mongoose = require('mongoose')
const Order = require("../models/orderModel");
const User = require("../models/userModel");


const filter=async(req,res)=>{
    
    let sort=Number(req.body.sort)
    let brandId=req.body.brand;
    let materialId=req.body.materials;
   
    let products;
    if(brandId.length>0&&materialId.length>0){
      
        brandId=brandId.map(brand=>(mongoose.Types.ObjectId(brand)))  
        materialId=materialId.map(material=>(mongoose.Types.ObjectId(material))); 
      
       
         products=await Product.aggregate([ 
            {$match:{materialId:{$in:materialId}}},       
           
            {$match:{brandId:{$in:brandId}}},
            {$sort:{price:sort}},
            {$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }},
        ])  


    }else if(brandId.length>0){
        brandId=brandId.map(brand=>(mongoose.Types.ObjectId(brand)))  
        

        
        products=await Product.aggregate([ 
        
            {$match:{brandId:{$in:brandId}}},
            {$sort:{price:sort}},
            {$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }},
        ])  
       
      
    
        

    }else if(materialId.length>0){
        
        materialId=materialId.map(material=>(mongoose.Types.ObjectId(material))); 
        products=await Product.aggregate([ 
            {$match:{materialId:{$in:materialId}}},    
            {$sort:{price:sort}},
           {$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }},{$lookup:{
        from:"brands",
        localField:"brandId",
        foreignField:"_id",
        as:"brand"
   }}
        ])  

      
    
       
        
    }
    else{
     products=await Product.aggregate([      
        {$sort:{price:sort}},
        {$lookup:{
          from:"brands",
          localField:"brandId",
          foreignField:"_id",
          as:"brand"
         }}, {$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }}
        ])
    }
   
    res.send({products})


}
 
exports.filter=filter;

const genderFilter= async(req,res)=>{
    let sort=Number(req.body.sort)
    let brandId=req.body.brand;
    let materialId=req.body.materials;
    let gender=req.body.gender;
    gender=mongoose.Types.ObjectId(gender)  


   
    let products;
    if(brandId.length>0&&materialId.length>0){
      
        brandId=brandId.map(brand=>(mongoose.Types.ObjectId(brand)))  
        materialId=materialId.map(material=>(mongoose.Types.ObjectId(material))); 
      
       
         products=await Product.aggregate([ 
            {$match:{categoryId:gender}},       
            {$match:{materialId:{$in:materialId}}},       
           
            {$match:{brandId:{$in:brandId}}},
            {$sort:{price:sort}},
            {$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }},
        ])  


    }else if(brandId.length>0){
        brandId=brandId.map(brand=>(mongoose.Types.ObjectId(brand)))  
        

        
        products=await Product.aggregate([ 
            {$match:{categoryId:gender}},        
            {$match:{brandId:{$in:brandId}}},
            {$sort:{price:sort}},
            {$lookup:{
              from:"brands",
              localField:"brandId",
              foreignField:"_id",
              as:"brand"
         }},{$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }},
        ])  
       
      
    
        

    }else if(materialId.length>0){
        
        materialId=materialId.map(material=>(mongoose.Types.ObjectId(material))); 
        products=await Product.aggregate([ 
            {$match:{categoryId:gender}},
            {$match:{materialId:{$in:materialId}}},    
            {$sort:{price:sort}},
           {$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }},{$lookup:{
        from:"brands",
        localField:"brandId",
        foreignField:"_id",
        as:"brand"
   }}
        ])  

      
    
       
        
    }
    else{
     products=await Product.aggregate([   
        {$match:{categoryId:gender}},

        {$sort:{price:sort}},
        {$lookup:{
          from:"brands",
          localField:"brandId",
          foreignField:"_id",
          as:"brand"
         }}, {$lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"material"
       }}
        ])
    }
    console.log(products)
   
    res.send({products})


}
exports.genderFilter=genderFilter;
