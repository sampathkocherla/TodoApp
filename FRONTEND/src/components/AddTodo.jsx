
import axios from 'axios';
import React from 'react'
import { useState } from 'react'

function AddTodo({ fetchTodos }) {
    const[todo,settodo]=useState("");
    const addtask=async()=>{
        await axios.post("http://localhost:8000/todo/creat",{title:todo});
        settodo(" ");
        fetchTodos();
    }
  return (
    <div>
       <input placeholder='enter the task' value={todo}    onChange={(e)=>settodo(e.target.value)}></input>
       <button onClick={()=>addtask()}>ADD task</button>
    </div>
  )
}

export default AddTodo