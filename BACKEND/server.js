
const express=require("express");

const app=express();
const port=8000;
require("dotenv").config();
const bcrypt = require("bcrypt");
const Todo=require("./models/todo");
const User=require("./models/User");
const mongoose = require("mongoose");
const todoRoutes=require("./routes/TodoRoutes");

const jwtscretkey="shannu07";
const cors=require("cors");
const jwt=require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.Mongodbconstr)
 .then(()=>{console.log("sucssfully conncted to db")})
 .catch((err)=>{console.log(err)});


app.get("/",(req,res)=>{
    res.send("server is working");
});
const authMidleware=(req,res,next)=>{
    try{
      const authheader=req.headers.authorization;
      if(!authheader){
          return res.status(401).json({ message: "Token missing" });
      }
      const token=authheader.split(" ")[1];
      if(!token){
        return res.status(401).json({message:"invalid token"});
      }
      const decode=jwt.verify(token,jwtscretkey);
      req.user=decode;
      next();

    }catch(error){
        res.status(401).send("invalid or expired token");
    }
}


app.use("/todo",authMidleware,todoRoutes);
app.post("/signup",async(req,res)=>{
     try{
        const {username,password}=req.body;
        const exstinguser=await User.findOne({username});
        if(exstinguser){
            return res.send("user already existed");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
           const user=await User.create({username,password:hashedPassword});
           res.status(200).json({message:"succsfully user created",username:user.username})
     }catch(error){
          console.log(error);
          res.status(400).json({message:error.message})
     }
})

 
app.post("/login",async(req,res)=>{
    try{
         const {username,password}=req.body;
    const user=await User.findOne({username:username});
     if(!user){
        return res.status(200).json({message:"user not found"});
     }
    const ismatch=await bcrypt.compare(password,user.password);
     if(!ismatch){
         return res.status(200).json({message:"incorrect password"});
     }
     const userPayload={
        username:user.username,
        id:user._id
     }
     const token=jwt.sign(userPayload,jwtscretkey,{expiresIn:'1h'})
      res.status(200).json({
      message: "Login successful",
      token:token
    });

    }catch(error){
        console.log(error);
          res.status(400).json({message:error.message})
    }

});
app.get("/profile", authMidleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });
});

  
app.listen(port,()=>{
    console.log("server is running on the port  ");
});