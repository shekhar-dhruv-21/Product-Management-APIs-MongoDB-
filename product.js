const express= require("express")
const mongoose = require("mongoose")
const router = express.Router();
router.use(express.json());

//create model
const productModel=require("./Models/productModel")
const companyModel=require("./Models/companyModel")
const sellerModel=require("./Models/sellerModel")
router.get("/",(req,res) => {

    res.json({data:["Product Details"]});

});

//add product
router.post("/addProduct",(req,res)=>{
    const newProduct= req.body;
   productModel.create(newProduct);
   return res.json({ data :"Data added successfully"});
});

//delete product
router.delete("/deleteProduct/:id",async(req,res)=>{
    const productId= req.params.id;
     const  deletedProduct =await productModel.findOneAndDelete({productId : productId});
     res.json({status:"Product Deleted Successfully",data:deletedProduct})
    });


// update product (add/remove category)
router.put("/updateProduct/:id",async(req,res)=>{
    const productId=req.params.id;
    const category=req.body.category;
    const updateProduct= await productModel.findOneAndUpdate(
        {productId:productId},
        {category:category},
        {new:true}
        );
    res.json({msg:"Product Updated Successfully",newData:updateProduct})

});

//fetch all products of a seller
router.get("/retrieve/pdroductOfSeller/:sid",async(req,res)=>{
    const sellerId=req.params.sid;
    const sellerData=await sellerModel.find({selllerId:sellerId},{productId:true});
    if(sellerData.length==0){
        res.json({data:"seller not found"});
    }
    const productId=sellerData[0].productId;
    const productData=await productModel.find({productId:productId})
    res.json({data:productData});
});
//fetch all products of a company
router.get("/retrieve/pdroductOfCompany/:cid",async(req,res)=>{
    const companyId=req.params.cid;
    const companyData=await companyModel.find({companyId:companyId},{productId:true});
    if(companyData.length==0){
        res.json({data:"company not found"});
    }
    const productId=companyData[0].productId;
    const productData=await productModel.find({productId:productId})
    res.json({data:productData});
});
module.exports = router;