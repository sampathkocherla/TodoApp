 import axios from "axios";
import React, { useState } from "react";

function AddTodo({ fetchTodos }) {
  const [todo, setTodo] = useState("");

  const addtask = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/todo/creat",
        { title: todo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodo("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        placeholder="enter the task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addtask}>ADD task</button>
    </div>
  );
}

export default AddTodo;