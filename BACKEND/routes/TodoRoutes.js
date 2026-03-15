    

const express=require("express");
const router=express.Router();

const {createtodo,delettodo,gettodos,updttodo} =require("../controllers/todoController");
 
router.post("/creat",createtodo);
router.delete("/delete/:id",delettodo);
router.get("/alltodos",gettodos);
router.put("/updatetodo/:id",updttodo);


module.exports=router;