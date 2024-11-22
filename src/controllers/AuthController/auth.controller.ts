import { Request, Response } from 'express';
import { IAuthController } from './auth.controller.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { IAuthService } from '../../services/AuthService/auth.service.interface';

@injectable()
export class AuthController implements IAuthController {
	constructor(@inject(TYPES.AuthService) private authservice: IAuthService) {}

	// POST /auth/register
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const user = req.user;
			if (user?.role !== 'ADMIN') {
				res.status(403).json({ message: 'Forbidden, only Admin can register users' });
			}
			const registeruser = await this.authservice.register(req.body);
			res.status(201).json(registeruser);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	// POST /auth/login
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { token } = await this.authservice.login(req.body);
			res.status(200).json(token);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
