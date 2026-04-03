/*
my-react-app template by Vite as a starting point for the project.
*/
const API_URL = "http://localhost:8080";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
