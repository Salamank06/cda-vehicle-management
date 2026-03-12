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
app.use(cors({
  origin: '*', // Allow all origins for now to avoid CORS issues in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Log requests for debugging in production
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// basic health check route
app.get('/', (req, res) => {
  res.send('CDAutoAlert API is running');
});

// routes setup
app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/vehiculos', vehiculoRoutes);

// export app for vercel
export default app;

// start server only if not in production or if explicitly told to
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
