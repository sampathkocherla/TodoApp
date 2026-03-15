

const Todo=require("../models/todo");

const createtodo=async(req,res)=>{
   try{
      const {title}=req.body;
      if(!title || title==""){
        return res.status(400).json({message:"title is required"});
      }
      const todo=await Todo.create({title});
      return res.status(201).json(todo);

   }catch(err){
    return res.status(500).json({message:err.message});
   }

}

const delettodo=async(req,res)=>{
    try{
         const {id}=req.params;
         const dlttask=await Todo.findByIdAndDelete(id);
         return res.status(200).json({message:"sucssfully deleted",data:dlttask});
    }catch(err){
    return res.status(500).json({message:err.message});
   }
}

const gettodos=async(req,res)=>{
    try{
       const data=await Todo.find();
       return res.status(200).json({message:"sucsfully fetched all todos",data:data});

    }catch(err){
    return res.status(500).json({message:err.message});
   }
}
const updttodo=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title}=req.body;
        const updtdata=await Todo.findByIdAndUpdate(id,{title},{ new: true });
        return res.status(200).json({message:"sucsfully updated",data:updtdata});

    }catch(err){
    return res.status(500).json({message:err.message});
   }
}

module.exports={createtodo,delettodo,gettodos,updttodo};