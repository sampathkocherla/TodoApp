 import axios from "axios";
import { useState } from "react";

function TodoList({ data, fetchTodos }) {
  const [editid, Seteditid] = useState(null);
  const [edittext, Setedittext] = useState("");

  const dltfunc = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8000/todo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editfun = (todo) => {
    Seteditid(todo._id);
    Setedittext(todo.title);
  };

  const updtfunc = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/todo/updatetodo/${id}`,
        { title: edittext },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Seteditid(null);
      Setedittext("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data.map((todo) => (
        <div key={todo._id}>
          {editid === todo._id ? (
            <>
              <input
                value={edittext}
                onChange={(e) => Setedittext(e.target.value)}
              />
              <button onClick={() => updtfunc(todo._id)}>Save</button>
              <button
                onClick={() => {
                  Setedittext("");
                  Seteditid(null);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <p>
              {todo.title}
              <button onClick={() => dltfunc(todo._id)}>Delete</button>
              <button onClick={() => editfun(todo)}>Edit</button>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;