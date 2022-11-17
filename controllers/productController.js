const Product = require("../models/productModel");
const Category=require("../models/categoryModel");
const Brand=require("../models/brandModel");
const Material=require("../models/materialModel");
const { collection } = require("../models/productModel");
 const { mapReduce } = require("../models/categoryModel");

const productPage=async(req,res)=>{
    const category=await Category.find({});
    const brand=await Brand.find();
    const material=await Material.find();
    const productList=await Product.aggregate([{
        $lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"catFind"    
        }

    },{
        $lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"materialsFind"
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
    const findMaterial=await Product.aggregate([{
        $lookup:{
            from:"materials",
            localField:"materialId",
            foreignField:"_id",
            as:"materialsFind"
        }
        
    }])
   
    //  console.log(findBrand);

    // console.log(productList[0].catFind[0].name);
    // console.log(productList[0].catFind[0].subcategory[productList[0].subcategoryIndex]);
    // console.log(productList[0].subcategoryIndex);
    // console.log(productList[0].desc)


    
    
    res.render("admin/adminProduct",{brand,category,productList,findBrand,material,findMaterial});

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
    const {name,desc,price,mrp,categoryId,subcategoryIndex,brandId,materialId}={name:req.body.prodcutName,desc:req.body.productDesc,price:req.body.productPrice,mrp:req.body.productMrp,categoryId:req.body.productCategory,subcategoryIndex:req.body.productSubcategory,brandId:req.body.producutBrand,materialId:req.body.materialId}

    // const {name,desc,price,mrp,categoryId}={name:req.body.prodcutName,desc:req.body.productDesc,price:req.body.productPrice,mrp:req.body.productMrp,categoryId:req.body.productCategory}
    // const categoryId=req.body.productCategory;
    // const brandId=req.body.producutBrand;
    // const subcategoryIndex=req.body.productSubcategory;


    console.log("maerial id ",materialId);
    

    
    const stocks={
        small:req.body.sizeSmall,
        medium:req.body.sizeMidium,
        large:req.body.sizeLarge
    }
    const phots=req.files.map(img=>({url:img.path ,filename:img.filename}));


    console.log("inside the product submition")
    const newProduct=new Product({name,desc,categoryId,brandId,subcategoryIndex,price,mrp,stocks,phots,materialId}); 
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

const productView=async(req,res,next)=>{
    console.log(req.params.id);
    let product
    let category
    let brand
    let material
    try {
         product=await Product.findById(req.params.id)  
         category=await Category.find();
         brand =await Brand.find();
         material=await Material.find();  
        
    } catch (error) {
        res.render("./user/errorPage.ejs");
        return next     
        
    }
    for(vale of category)
    {
        
        console.log("\n inside checking product id and car")
        console.log(vale._id," \n  ",product.categoryId)

        if(String(vale._id)==String(product.categoryId)){
            console.log(vale.name,"kitti mouse");
            findCat=vale;
        }
    }  
    console.log("inside product page")
    console.log(product);
    
    res.render("admin/adminProductView",{product,category,brand,findCat,material})
   
}
exports.productView=productView;


const productEdit=async(req,res)=>{
   
    const {name,desc,price,mrp,categoryId,subcategoryIndex,brandId,materialId}={name:req.body.prodcutName,desc:req.body.productDesc,price:req.body.productPrice,mrp:req.body.productMrp,categoryId:req.body.productCategory,subcategoryIndex:req.body.productSubcategory,brandId:req.body.producutBrand,materialId:req.body.materialId}
    console.log(req.params.prId);
    const phots=req.files.map(img=>({url:img.path ,filename:img.filename}));


    // console.log(req.body)

     const stocks={
        small:req.body.sizeSmall,
        medium:req.body.sizeMidium,
        large:req.body.sizeLarge
    }
    try {
        const product=await Product.findByIdAndUpdate(req.params.prId,{name,desc,price,mrp,categoryId,subcategoryIndex,brandId,stocks,materialId});
        product.phots.push(...phots);
        product.save();

        
    } catch (err) {
        console.log(err._message);
        
    }
   res.redirect('back')

}
exports.productEdit=productEdit;