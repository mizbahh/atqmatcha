import React, { useState } from 'react';
import './login.css';
import App from '../App';
import CreateUserPage from './CreateUserPage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState('login'); // 'login' | 'createUser' | 'app'

  if (view === 'app') return <App />;
  if (view === 'createUser') return <CreateUserPage onBack={() => setView('login')} />;

  
  const handleLogin = async () => {
    
    if(!username || !password){
      console.log("Missing Username / Password Field");
      return;
    }

    try{


      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({username, password}),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Invalid credentials");
        return;
      }

       
      //Stores token in local storage - page holds token for user info
      localStorage.setItem("token", data.token);
      

      //Goes to the home screen after successful login
      setError("");
      setView('app');
    } catch(err){
      console.log("Login Error:", err);
    }

  };

  const handleCreateUser = () => {
    console.log('handleCreateUser called');
    setView('createUser');
  };

  return (
    <div className="loginContainer">
      <h1 className="welcome">Welcome to ATQ Matcha</h1>

      <form className="loginField">
        <div>
          <label className="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="loginInput"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginInput"
          />
        </div>
        
        {error && <p className="errorMessage">{error}</p>}

        <button type="button" className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </form>

      <button type="button" className="createUserButton" onClick={handleCreateUser}>
        Create User
      </button>
    </div>
  );
}
