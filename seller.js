const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()

const sellerModel=require("./Models/sellerModel")
const productModel=require("./Models/productModel")

router.use(express.json())
router.get("/",(req,res)=>{
    res.json({data:"Seller Details"})
})

//add seller
router.post("/addSeller",(req,res)=>{
    const newSeller=req.body;
    sellerModel.create(newSeller);
    res.json({data:"Seller Added Successfully"})
})

//delete Seller

router.delete("/deleteSeller/:id",async(req,res)=>{
    const sellerId=req.params.id;
    const deleteSeller= await sellerModel.findOneAndDelete({sellerId:sellerId})
    res.json({status:"Seller Deleted Successfully",data:deleteSeller})
});

//update seller (add/remove products)
router.put("/updateSeller/:id",async(req,res)=>{
    const sellerId=req.params.id;
    const productId=req.body.productId;
    const updateSeller=await sellerModel.findOneAndUpdate(
        {sellerId:sellerId},
        {productId:productId},
        {new :true}
    );
    res.json({status:"Seller Updated Successfully",data:updateSeller})

})

//fetch seller details based on product name

router.get("/retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const productData =await productModel.find({title : pname},{companyId:true});

    if(productData.length == 0){
        return res.json({data : "no user in fullstack"});
    }
    const  sellerId=productData[0]["sellerId"];
    const sellerData =await sellerModel.find({sellerId : sellerId},{});

    return res.json({data:sellerData });

})
module.exports=router;