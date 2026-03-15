
import './App.css'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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
      <AddTodo fetchTodos={fetchTodos}/>
      <TodoList data={data}fetchTodos={fetchTodos}/>
      
    </div>
  )
}

export default App
