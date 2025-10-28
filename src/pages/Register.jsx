import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/.netlify/functions/supabase?path=register&method=POST", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    });
    const data = await res.json();
    setMessage(data.error ? data.error.message : "Check your email for verification link!");
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;
