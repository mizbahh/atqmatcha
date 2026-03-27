import React, { useState } from 'react';
import './login.css';
import App from './App';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Placeholder login handler -> in a real app, verify credentials here
    const handleLogin = () => {
        // For now, just set logged in to true
        console.log('handleLogin called');
        console.log(`Logging in with username: ${username} and password: ${password}`); // debug log
        setIsLoggedIn(true);
    };

    // Handles Create New User button click -> in a real app, navigate to registration page
    const handleCreateUser = () => {
        console.log('handleCreateUser called');
        setIsLoggedIn(true);
    }

    // If logged in, show the main app
    if (isLoggedIn) {
        return <App />;
    }

    return (
        <div className="loginContainer">
            <h1>Welcome to ATQ Matcha</h1>

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

                <button type="button" className="loginButton" onClick={handleLogin}>Login</button>

            </form>
            <button type="button" className="createUserButton" onClick={handleCreateUser}>Create New User</button>
        </div>
    );
}