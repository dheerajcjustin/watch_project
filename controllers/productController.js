const Product = require("../models/productModel");
const Category=require("../models/categoryModel");
const Brand=require("../models/brandModel");
const { collection } = require("../models/productModel");
// const { mapReduce } = require("../models/categoryModel");

const productPage=async(req,res)=>{
    const category=await Category.find({});
    const brand=await Brand.find();
    const productList=await Product.aggregate([{
        $lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"catFind"    
        }

    }]);
     const findBrand=await Product.aggregate([{
        $lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brandFind"
        }

    }]);
   
    //  console.log(findBrand);

    // console.log(productList[0].catFind[0].name);
    // console.log(productList[0].catFind[0].subcategory[productList[0].subcategoryIndex]);
    // console.log(productList[0].subcategoryIndex);
    // console.log(productList[0].desc)


    
    
    res.render("admin/adminProduct",{brand,category,productList,findBrand});

}
exports.productPage=productPage;

const subcategorySelect=async(req,res)=>{
    let id=req.body.categoryId;
    const newCategory =await Category.findById(id);
    const subcategory=newCategory.subcategory;
    res.send({subcategory})


}
exports.subcategorySelect=subcategorySelect;

const productPost=async(req,res)=>{
    console.log(req.body,req.files)
    const {name,desc,price,mrp,categoryId,subcategoryIndex,brandId}={name:req.body.prodcutName,desc:req.body.productDesc,price:req.body.productPrice,mrp:req.body.productMrp,categoryId:req.body.productCategory,subcategoryIndex:req.body.productSubcategory,brandId:req.body.producutBrand}

    // const {name,desc,price,mrp,categoryId}={name:req.body.prodcutName,desc:req.body.productDesc,price:req.body.productPrice,mrp:req.body.productMrp,categoryId:req.body.productCategory}
    // const categoryId=req.body.productCategory;
    // const brandId=req.body.producutBrand;
    // const subcategoryIndex=req.body.productSubcategory;


    console.log("naem  id  ",name);
    console.log("desc is   ",desc);
    console.log("category id  ",categoryId);
    console.log("subcate id ",subcategoryIndex);
    console.log("price id  ",price);
    console.log("mrp id  ",mrp);

    console.log("brand id  ",brandId);
    console.log("brand id  ",brandId);

    

    
    const stocks={
        small:req.body.sizeSmall,
        medium:req.body.sizeMidium,
        large:req.body.sizeLarge
    }
    const phots=req.files.map(img=>({url:img.path ,filename:img.filename}));


    console.log("inside the product submition")
    const newProduct=new Product({name,desc,categoryId,brandId,subcategoryIndex,price,mrp,stocks,phots});
    console.log(newProduct);
      try {
        await newProduct.save();
    }
    catch (err) {
        console.log(err)
    }

    res.redirect('/admin/product');

    


}
exports.productPost=productPost;

const productView=async(req,res)=>{
    console.log(req.params.id);
    const product=await Product.findById(req.params.id)
    console.log(product)
    const category=await Category.find();
    const brand =await Brand.find();

    for(vale of category)
    {
        
        console.log("\n inside checking product id and car")
        console.log(vale._id," \n  ",product.categoryId)

        if(String(vale._id)==String(product.categoryId)){
            console.log(vale.name,"kitti mouse");
            findCat=vale;
        }
    }
    console.log(findCat)
    
    res.render("admin/adminProductView",{product,category,brand,findCat})
   
}
exports.productView=productView;


const productEdit=async(req,res)=>{
    res.send("hai patch working");
    console.log(req.params.prId);
    const phots=req.files.map(img=>({url:img.path ,filename:img.filename}));

    // console.log(req.body)
    const {name,desc,price,mrp,categoryId,subcategoryIndex,brandId}={name:req.body.prodcutName,desc:req.body.productDesc,price:req.body.productPrice,mrp:req.body.productMrp,categoryId:req.body.productCategory,subcategoryIndex:req.body.productSubcategory,brandId:req.body.producutBrand}
     const stocks={
        small:req.body.sizeSmall,
        medium:req.body.sizeMidium,
        large:req.body.sizeLarge
    }
    try {
        const product=await Product.findByIdAndUpdate(req.params.prId,{name,desc,price,mrp,categoryId,subcategoryIndex,brandId,stocks,});
        product.phots.push(...phots);
        product.save();

        
    } catch (err) {
        console.log(err._message);
        
    }
    console.log("naem  is  ",name);
    console.log("desc is   ",desc);
    console.log("category id  ",categoryId);
    console.log("subcate id ",subcategoryIndex);
    console.log("price id  ",price);
    console.log("mrp id  ",mrp);

    console.log("brand id  ",brandId);
    console.log("brand id  ",stocks);

}
exports.productEdit=productEdit;