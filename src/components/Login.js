import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/notes');
      } else {
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setMessage('Impossible de se connecter au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Nom d'utilisateur</label>
          <div className="input-wrapper">
            <FiUser className="input-icon" />
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      
      {message && (
        <div className={`message ${!message.includes('réussie') ? 'error' : ''}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default Login; 