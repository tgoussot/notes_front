import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? 'Se connecter' : 'Créer un compte'}</h2>
        
        {isLogin ? <Login /> : <Register />}
        
        <p className="switch-text">
          {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
          <button 
            className="switch-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth; 