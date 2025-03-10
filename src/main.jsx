import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        <App />
      </div>
    </Router>
  </StrictMode>,
)
