import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

import authRoutes from './routes/authRoutes';
import clienteRoutes from './routes/clienteRoutes';
import vehiculoRoutes from './routes/vehiculoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware setup
app.use(cors());
app.use(express.json());

// basic health check route
app.get('/', (req, res) => {
  res.send('CDAutoAlert API is running');
});

// routes setup
app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/vehiculos', vehiculoRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
