import { Request, Response } from 'express';
import { UserRepositoryDatabase } from '../../repositories/postgres';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const userRepository = new UserRepositoryDatabase();
        const user = await userRepository.getByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials 1.' });
        }

        const isPasswordHashed = user.password.length === 60;

        if (!isPasswordHashed) {
            return res.status(401).json({ message: 'Invalid credentials 2.' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials 3.' });
        }

        const token = sign({ sub: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '24h' }
        );

        res.json({ token });
    }
}