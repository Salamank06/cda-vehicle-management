import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

interface Cliente {
  id: number;
  nombre: string;
}

interface Vehiculo {
  id: number;
  cliente_id: number;
  placa: string;
  marca: string;
  modelo: string;
  fecha_vencimiento_rtm: string;
  fecha_vencimiento_soat: string;
  cliente?: Cliente;
}

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente_id, setClienteId] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [rtm, setRtm] = useState('');
  const [soat, setSoat] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchVehiculos();
    fetchClientes();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await api.get('/vehiculos');
      setVehiculos(response.data);
    } catch (err) {
      console.error('Error cargando vehículos', err);
    }
  };

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
      const data = { 
        cliente_id: parseInt(cliente_id), 
        placa, 
        marca, 
        modelo, 
        fecha_vencimiento_rtm: rtm, 
        fecha_vencimiento_soat: soat 
      };
      if (editingId) {
        await api.put(`/vehiculos/${editingId}`, data);
      } else {
        await api.post('/vehiculos', data);
      }
      resetForm();
      fetchVehiculos();
    } catch (err) {
      console.error('Error guardando vehículo', err);
    }
  };

  const resetForm = () => {
    setClienteId('');
    setPlaca('');
    setMarca('');
    setModelo('');
    setRtm('');
    setSoat('');
    setEditingId(null);
  };

  const handleEdit = (v: Vehiculo) => {
    setEditingId(v.id);
    setClienteId(v.cliente_id.toString());
    setPlaca(v.placa);
    setMarca(v.marca);
    setModelo(v.modelo);
    setRtm(v.fecha_vencimiento_rtm.split('T')[0]);
    setSoat(v.fecha_vencimiento_soat.split('T')[0]);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Seguro que quieres eliminar este vehículo?')) {
      try {
        await api.delete(`/vehiculos/${id}`);
        fetchVehiculos();
      } catch (err) {
        console.error('Error eliminando vehículo', err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Gestión de Vehículos</h1>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Editar Vehículo' : 'Nuevo Vehículo'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label>Cliente Propietario:</label>
              <select value={cliente_id} onChange={(e) => setClienteId(e.target.value)} required>
                <option value="">Seleccione un cliente</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Placa:</label>
              <input value={placa} onChange={(e) => setPlaca(e.target.value)} required placeholder="ABC-123" />
            </div>
            <div className="form-group">
              <label>Marca:</label>
              <input value={marca} onChange={(e) => setMarca(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Modelo:</label>
              <input value={modelo} onChange={(e) => setModelo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Vencimiento RTM:</label>
              <input type="date" value={rtm} onChange={(e) => setRtm(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Vencimiento SOAT:</label>
              <input type="date" value={soat} onChange={(e) => setSoat(e.target.value)} required />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary">{editingId ? 'Guardar Cambios' : 'Registrar Vehículo'}</button>
              {editingId && (
                <button type="button" className="btn-outline" onClick={resetForm}>
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
                <th>Placa</th>
                <th>Marca / Modelo</th>
                <th>Cliente</th>
                <th>Vencimiento RTM</th>
                <th>Vencimiento SOAT</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length > 0 ? (
                vehiculos.map(v => (
                  <tr key={v.id}>
                    <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{v.placa}</td>
                    <td>{v.marca} {v.modelo}</td>
                    <td>{v.cliente?.nombre}</td>
                    <td>
                      <span className="badge badge-info">
                        {v.fecha_vencimiento_rtm.split('T')[0]}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-info">
                        {v.fecha_vencimiento_soat.split('T')[0]}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-outline" onClick={() => handleEdit(v)} style={{ marginRight: '0.5rem', padding: '0.4rem 0.8rem' }}>Editar</button>
                      <button className="btn-danger" onClick={() => handleDelete(v.id)} style={{ padding: '0.4rem 0.8rem' }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No hay vehículos registrados.
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

export default Vehiculos;
