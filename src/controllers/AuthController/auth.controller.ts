import 'reflect-metadata';
import { Request, Response } from 'express';
import { IAuthController } from './auth.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IAuthService } from '../../services/AuthService/auth.service.interface';
import { IRoleRegisterDto } from '../../dto/register.dto.interface';
import { IRoleLoginDto } from '../../dto/login.dto.interface';
import bcrypt from 'bcryptjs';

@injectable()
export class AuthController implements IAuthController {
	constructor(@inject(TYPES.AuthService) private authservice: IAuthService) {}
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, name, role }: IRoleRegisterDto = req.body;
			if (!email || !password || !name || !role) {
				res.status(400).json({
					message: 'Invalid admin data. email, password, name, role are required.',
				});
				return;
			}
			if (role === 'ADMIN') {
				const admin = await this.authservice.getByRole(role);
				if (admin) {
					res.status(400).json({ message: 'Admin is existed!' });
					return;
				}
			}
			if (role === 'SUPPLIER') {
				res.status(400).json({
					message: 'Only admin can register! We should wait until ADMIN create your account',
				});
				return;
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const admin = await this.authservice.register(email, hashedPassword, name, role);
			res.status(201).json(admin);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password }: IRoleLoginDto = req.body;
			if (!email || !password) {
				res.status(400).json({
					message: 'Invalid user data. email, password are required.',
				});
				return;
			}
			const result = await this.authservice.login(email, password);
			if (!result) {
				res.status(404).json({ message: 'Invalid email or password.' });
				return;
			}
			res.status(200).json({ access_token: result.token });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
}
