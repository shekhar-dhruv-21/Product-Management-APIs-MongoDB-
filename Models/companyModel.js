const mongoose=require("mongoose");
const companySchema=mongoose.Schema({
    companyId : String,
    name : String,
    productId : [String]
})

const companyModel=mongoose.model("company",companySchema,"company");
module.exports=companyModel;