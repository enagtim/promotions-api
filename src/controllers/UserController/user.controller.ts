import { Request, Response } from 'express';
import { IUserController } from './user.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IUserService } from '../../services/UserService/user.service.interface';
import 'reflect-metadata';

@injectable()
export class UserController implements IUserController {
	constructor(@inject(TYPES.UserService) private userService: IUserService) {}

	// POST /users
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
	// GET /users/:id
	public async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const user = await this.userService.getUserById(Number(req.params.id));
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
	// PATCH /users/:id
	public async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const user = await this.userService.updateDataUser(Number(req.params.id), req.body);
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
	// DELETE /users/:id
	public async deleteUser(req: Request, res: Response): Promise<void> {
		try {
			const user = await this.userService.deleteUser(Number(req.params.id));
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.send(204).json({ message: 'User is deleted' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
