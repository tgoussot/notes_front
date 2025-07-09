import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Notes from './components/Notes';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/notes" /> : <Auth />} />
        <Route 
          path="/notes" 
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
