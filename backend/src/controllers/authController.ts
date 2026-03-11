import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

// secret for jwt from environment
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    // check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const user = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// login user and return token
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate jwt token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
