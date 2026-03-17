 import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8000/signup", {
        username,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <input
        value={username}
        placeholder="enter username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;