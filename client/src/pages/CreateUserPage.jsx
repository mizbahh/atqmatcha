/*
  Page for creating a new user account.
*/

/*
  TODO: BACKEND IMPLEMENTATION FOR CREATING AN ACCOUNT
*/

import React, { useState } from 'react';
import './login.css';

export default function CreateUserPage({ onBack }) {
  const [username, setUsername]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirm]   = useState('');
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState(false);

  // Handles the submit process ***NEEDS BACKEND IMPLEMENTATION*** CURRENTLY JUST LOGS TO CONSOLE AND SHOWS SUCCESS MESSAGE
  const handleSubmit = async () => {
    // Basic validation to make sure all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Validation to check if password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

   //Tries to create a new user, and stores a token of login
    try{
      //Makes POST request to create the user and add them to the database
      const res = await fetch("http://localhost:5001/api/auth/register",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password}),
      });

      const data = await res.json();

      if (!res.ok){
        setError(data.msg || "Error Creating Account");
        return;
      }

      setError("");
      setSuccess(true);

    } catch(err){
      setError("Internal Server Error. Try Again Later");
    }
  }


  // Renders success message if account creation is successful, otherwise renders the create user form.
  if (success) {
    return (
      <div className="loginContainer">
        <h1 className="welcome">Account Created!</h1>
        <p className="successMessage">
          Welcome, <strong>{username}</strong>! Your account has been created successfully.
        </p>
        <button type="button" className="loginButton" onClick={onBack}>
          Back to Login
        </button>
      </div>
    );
  }

  // Renders create user form.
  return (
    <div className="loginContainer">
      <h1 className="welcome">Create an Account</h1>
      <form className="loginField">
        <div>
          <label htmlFor="new-username">Username:</label>
          <input
            id="new-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="loginInput"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="loginInput"
          />
        </div>
        <div>
          <label htmlFor="new-password">Password:</label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginInput"
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)}
            className="loginInput"
          />
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <button type="button" className="loginButton" onClick={handleSubmit}>
          Create Account
        </button>
      </form>
      <button type="button" className="createUserButton" onClick={onBack}>
        ← Back to Login
      </button>
    </div>
  );
}

