import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// fetch all vehicles with owner info
export const getAll = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehiculo.findMany({
      include: { cliente: true }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// get single vehicle by id
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehiculo.findUnique({
      where: { id: parseInt(id as string) },
      include: { cliente: true }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error });
  }
};

// create a new vehicle entry
export const create = async (req: Request, res: Response) => {
  try {
    const { cliente_id, placa, marca, modelo, fecha_vencimiento_rtm, fecha_vencimiento_soat } = req.body;

    // check if plate is unique
    const existing = await prisma.vehiculo.findUnique({ where: { placa } });
    if (existing) {
      return res.status(400).json({ message: 'Vehicle with this plate already exists' });
    }

    const vehicle = await prisma.vehiculo.create({
      data: {
        cliente_id: parseInt(cliente_id),
        placa,
        marca,
        modelo,
        fecha_vencimiento_rtm: new Date(fecha_vencimiento_rtm),
        fecha_vencimiento_soat: new Date(fecha_vencimiento_soat)
      }
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};

// update vehicle information
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cliente_id, placa, marca, modelo, fecha_vencimiento_rtm, fecha_vencimiento_soat } = req.body;

    const vehicle = await prisma.vehiculo.update({
      where: { id: parseInt(id as string) },
      data: {
        cliente_id: parseInt(cliente_id),
        placa,
        marca,
        modelo,
        fecha_vencimiento_rtm: new Date(fecha_vencimiento_rtm),
        fecha_vencimiento_soat: new Date(fecha_vencimiento_soat)
      }
    });

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
};

// delete vehicle from database
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.vehiculo.delete({
      where: { id: parseInt(id as string) }
    });

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
};
