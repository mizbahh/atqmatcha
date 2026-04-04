import React, { useState } from 'react';
import './login.css';
import App from '../App';
import CreateUserPage from './CreateUserPage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('login'); // 'login' | 'createUser' | 'app'

  if (view === 'app') return <App />;
  if (view === 'createUser') return <CreateUserPage onBack={() => setView('login')} />;

  const handleLogin = () => {
    console.log('handleLogin called');
    console.log(`Logging in with username: ${username} and password: ${password}`);
    setView('app');
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
