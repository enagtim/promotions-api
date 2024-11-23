import { Request, Response } from 'express';
import { IAuthController } from './auth.controller.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { IAuthService } from '../../services/AuthService/auth.service.interface';

@injectable()
export class AuthController implements IAuthController {
	constructor(@inject(TYPES.AuthService) private authservice: IAuthService) {}
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const registeruser = await this.authservice.register(req.body);
			res.status(201).json(registeruser);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { token } = await this.authservice.login(req.body);
			res.status(200).json({ access_token: token });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
