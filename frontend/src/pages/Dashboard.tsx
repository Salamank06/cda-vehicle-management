import Navbar from '../components/Navbar';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <Navbar />
      <div className="container">
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>¡Bienvenido, {user.nombre || 'Usuario'}!</h1>
          <p style={{ color: 'var(--text-muted)' }}>Panel de control de CDAutoAlert.</p>
        </header>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>Gestión de Clientes</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Registra y administra los datos de contacto de tus clientes para un seguimiento personalizado.
              </p>
            </div>
            <button className="btn-primary" onClick={() => window.location.href='/clientes'}>Ir a Clientes</button>
          </div>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>Gestión de Vehículos</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Controla los vencimientos de RTM y SOAT de cada vehículo y genera alertas automáticas.
              </p>
            </div>
            <button className="btn-primary" onClick={() => window.location.href='/vehiculos'}>Ir a Vehículos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
