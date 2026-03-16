
import './App.css'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Login } from './components/Login';

function App() {
   const [data,setdata]=useState([]);
       const fetchTodos=async()=>{
              const res=await axios.get("http://localhost:8000/todo/alltodos");
              setdata(res.data.data);
       }
       useEffect(()=>{
           fetchTodos();
       },[])

  return (
    
    <div>
      <h1>TODO APP</h1>
      <Login fetchTodos={fetchTodos} data={data}/>
      
    </div>
  )
}

export default App
