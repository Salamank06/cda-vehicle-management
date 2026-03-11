import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

interface Cliente {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // load clients on component mount
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (err) {
      console.error('Error cargando clientes', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { nombre, documento, telefono, email };
      if (editingId) {
        await api.put(`/clientes/${editingId}`, data);
      } else {
        await api.post('/clientes', data);
      }
      // reset form and reload list
      setNombre('');
      setDocumento('');
      setTelefono('');
      setEmail('');
      setEditingId(null);
      fetchClientes();
    } catch (err) {
      console.error('Error guardando cliente', err);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingId(cliente.id);
    setNombre(cliente.nombre);
    setDocumento(cliente.documento);
    setTelefono(cliente.telefono);
    setEmail(cliente.email);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Seguro que quieres eliminar este cliente?')) {
      try {
        await api.delete(`/clientes/${id}`);
        fetchClientes();
      } catch (err) {
        console.error('Error eliminando cliente', err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Gestión de Clientes</h1>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label>Nombre Completo:</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Documento de Identidad:</label>
              <input value={documento} onChange={(e) => setDocumento(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary">{editingId ? 'Guardar Cambios' : 'Registrar Cliente'}</button>
              {editingId && (
                <button type="button" className="btn-outline" onClick={() => { setEditingId(null); setNombre(''); setDocumento(''); setTelefono(''); setEmail(''); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 ? (
                clientes.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500 }}>{c.nombre}</td>
                    <td>{c.documento}</td>
                    <td>{c.telefono}</td>
                    <td>{c.email}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-outline" onClick={() => handleEdit(c)} style={{ marginRight: '0.5rem', padding: '0.4rem 0.8rem' }}>Editar</button>
                      <button className="btn-danger" onClick={() => handleDelete(c.id)} style={{ padding: '0.4rem 0.8rem' }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No hay clientes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
