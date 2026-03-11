import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isRegistering) {
      // handle registration
      try {
        await api.post('/auth/register', { nombre, email, password });
        setMessage('Registration successful! Please log in.');
        setIsRegistering(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed');
      }
    } else {
      // handle login
      try {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{isRegistering ? 'Registro' : 'CDAutoAlert'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label>Nombre:</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="form-group">
            <label>Correo electrónico:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</p>}
          {message && <p style={{ color: 'var(--success)', fontSize: '0.875rem' }}>{message}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            {isRegistering ? 'Crear cuenta' : 'Ingresar'}
          </button>
        </form>
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="btn-outline"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
};

export default Login;
