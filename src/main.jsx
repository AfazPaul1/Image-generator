import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Background from './Background/Background.jsx';
import App from './App.jsx'; // Import the app routes
import Login from '../Login/Login.jsx';
// import Model from '../src/Models/Model.jsx'; // Import the ModelComponent

import './index.css';

function Main() {
  return (
    <Router>
      <StrictMode>
        <Background />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} /> {/* Main App Route */}
        </Routes>
      </StrictMode>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
