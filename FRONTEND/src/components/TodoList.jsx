import axios from "axios";
import { useState } from "react";

 
function TodoList({data,fetchTodos}){
       const[editid,Seteditid]=useState(null);
       const[edittext,Setedittext]=useState("");

    const dltfunc=async(id)=>{
           await axios.delete(`http://localhost:8000/todo/delete/${id}`);
            fetchTodos();
    }
    const editfun=(todo)=>{
      Seteditid(todo._id);
      Setedittext(todo.title);
    }

    const updtfunc=async(id)=>{
        await axios.put(`http://localhost:8000/todo/updatetodo/${id}`,
            {title:edittext});
            Seteditid(null);
           Setedittext("");
             fetchTodos();
    }
    
     return(
        <div>
             {
                data.map((todo)=>(
                     <div>
                        {editid===todo._id ?(
                            <>
                             <input value={edittext} onChange={(e)=>Setedittext(e.target.value)}></input>
                             <button onClick={()=>updtfunc(todo._id)}>Save</button>
                             <button onClick={()=>{Setedittext("");Seteditid(null);}}>cancel</button>
                            </>
                        ):
                        <p key={todo._id}>{todo.title}<button onClick={()=>dltfunc(todo._id)}>Delete</button><button onClick={()=>editfun(todo)}>Edit</button></p>
                        }
                     </div>
                ))
             }
        </div>
    )
}
 
    
    export default TodoList;