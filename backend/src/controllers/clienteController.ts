import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// get all clients
export const getAll = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.cliente.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

// get single client by id
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await prisma.cliente.findUnique({
      where: { id: parseInt(id as string) },
      include: { vehiculos: true }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client', error });
  }
};

// create a new client
export const create = async (req: Request, res: Response) => {
  try {
    const { nombre, documento, telefono, email } = req.body;

    // check if document is unique
    const existing = await prisma.cliente.findUnique({ where: { documento } });
    if (existing) {
      return res.status(400).json({ message: 'Client with this document already exists' });
    }

    const client = await prisma.cliente.create({
      data: { nombre, documento, telefono, email }
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error });
  }
};

// update client record
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, documento, telefono, email } = req.body;

    const client = await prisma.cliente.update({
      where: { id: parseInt(id as string) },
      data: { nombre, documento, telefono, email }
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
};

// delete client from database
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.cliente.delete({
      where: { id: parseInt(id as string) }
    });

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};
