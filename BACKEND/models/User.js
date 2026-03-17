const mongoose=require("mongoose");

const Userschema=new mongoose.Schema({
    username:String,
    password:String,
})

module.exports=mongoose.model("User",Userschema);