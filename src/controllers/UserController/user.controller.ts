import { Request, Response } from 'express';
import { IUserController } from './user.controller.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { IUserService } from '../../services/UserService/user.service.interface';

@injectable()
export class UserController implements IUserController {
	constructor(@inject(TYPES.UserService) private userservice: IUserService) {}

	public async createUserBot(req: Request, res: Response): Promise<void> {
		try {
			const { city }: { city: string } = req.body;
			if (!city) {
				res.status(400).json({ message: 'City is required' });
				return;
			}
			const user = await this.userservice.createUser(city);
			res.status(201).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
	public async getAllUserBot(req: Request, res: Response): Promise<void> {
		try {
			const users = await this.userservice.getAllUser();
			res.status(200).json(users);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
	public async updateUserData(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const { city }: { city: string } = req.body;
			if (!city) {
				res.status(400).json({ message: 'City is required' });
				return;
			}
			const updateuser = await this.userservice.updateUser(id, city);
			res.status(200).json(updateuser);
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).json({ message: error.message });
			}
		}
	}
}
