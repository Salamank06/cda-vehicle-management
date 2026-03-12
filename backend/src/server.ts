import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

import authRoutes from './routes/authRoutes';
import clienteRoutes from './routes/clienteRoutes';
import vehiculoRoutes from './routes/vehiculoRoutes';
import prisma from './utils/prisma';

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

// Database health check
app.get('/db-check', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ status: 'connected', userCount });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// routes setup
app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/vehiculos', vehiculoRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('SERVER ERROR:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Unknown error'
  });
});

// export app for vercel
export default app;
