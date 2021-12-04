const express= require("express")
const mongoose=require("mongoose");
const router=express.Router();

const companyModel=require("./Models/companyModel")
const productModel=require("./Models/productModel")

router.use(express.json())

router.get("/",(req,res)=>{
    res.json({data:"Company Details"})
})
//add Company
router.post("/addCompany",(req,res)=>{
    const newCompany=req.body;
    companyModel.create(newCompany);
    res.json({data : "Company added Successfully"})
});

//delete Company
router.delete("/deleteCompany/:id",async(req,res)=>{
    const companyId=req.params.id;
    const deleteCompany= await companyModel.findOneAndDelete({companyId:companyId})
    res.json({status:"Company Deleted Successfully",data:deleteCompany})
});

//update company (add/remove products)
router.put("/updateCompany/:id",async(req,res)=>{
    const companyId=req.params.id;
    const productId=req.body.productId;
    const updateCompany=await companyModel.findOneAndUpdate(
        {companyId:companyId},
        {productId:productId},
        {new:true}
    );
    res.json({msg:"Company Updated Successfully!",newData:updateCompany});
});

//fetch company details based on product name
router.get("/retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const productData =await productModel.find({title : pname},{companyId:true});

    if(productData.length == 0){
        return res.json({data : "no user in fullstack"});
    }
    const  companyId=productData[0]["companyId"];
    const companyData =await companyModel.find({companyId : companyId},{});

    return res.json({data:companyData });

})
module.exports=router;