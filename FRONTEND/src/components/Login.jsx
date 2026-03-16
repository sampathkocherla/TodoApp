
import React, { useState } from 'react'
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export const Login = ({fetchTodos,data}) => {
    const[login,setLogin]=useState(false);
  return (
    <div>
        {login? (<> <AddTodo fetchTodos={fetchTodos}/>
      <TodoList data={data}fetchTodos={fetchTodos}/></>)
      :(<><button onClick={()=>{setLogin(!login)}}>login</button></>) }
    </div>
  )
}
