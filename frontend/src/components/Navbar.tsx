import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '0.75rem 1.5rem', 
      backgroundColor: 'white', 
      display: 'flex', 
      alignItems: 'center',
      gap: '2rem',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', marginRight: '1rem' }}>
        CDAutoAlert
      </div>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 500 }}>Dashboard</Link>
      <Link to="/clientes" style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 500 }}>Clientes</Link>
      <Link to="/vehiculos" style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 500 }}>Vehículos</Link>
      <button 
        onClick={handleLogout} 
        className="btn-outline"
        style={{ marginLeft: 'auto', padding: '0.5rem 1rem' }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
