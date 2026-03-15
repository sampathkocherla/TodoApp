
const express=require("express");

const app=express();
const port=8000;
require("dotenv").config();
const Todo=require("./models/todo");
const mongoose = require("mongoose");
const todoRoutes=require("./routes/TodoRoutes");
const cors=require("cors");
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.Mongodbconstr)
 .then(()=>{console.log("sucssfully conncted to db")})
 .catch((err)=>{console.log(err)});


app.get("/",(req,res)=>{
    res.send("server is working");
});

app.use("/todo",todoRoutes);
  
app.listen(port,()=>{
    console.log("server is running on the port  ");
});