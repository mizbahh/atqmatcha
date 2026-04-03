/*
  Main entry point for React application.
*/

const API_URL = "http://localhost:8080";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Renders the login page, which will conditionally render the main app or create user page based on user actions */}
    <LoginPage />
  </StrictMode>,
)
