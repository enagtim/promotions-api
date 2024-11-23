import { json, Request, Response } from 'express';
import { IUserController } from './user.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IUserService } from '../../services/UserService/user.service.interface';
import 'reflect-metadata';

@injectable()
export class UserController implements IUserController {
	constructor(@inject(TYPES.UserService) private userService: IUserService) {}
	public async createUser(req: Request, res: Response): Promise<void> {
		try {
			const user = await this.userService.createUser(req.body);
			res.status(201).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const user = await this.userService.getUserById(id);
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const user = await this.userService.updateDataUser(id, req.body);
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async deleteUser(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const user = await this.userService.deleteUser(id);
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.status(204).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
