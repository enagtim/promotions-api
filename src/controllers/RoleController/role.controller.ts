import { Request, Response } from 'express';
import { IRoleController } from './role.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IRoleService } from '../../services/RoleService/role.service.interface';
import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { IRoleRegisterDto } from '../../dto/register.dto.interface';

@injectable()
export class RoleController implements IRoleController {
	constructor(@inject(TYPES.RoleService) private roleService: IRoleService) {}
	public async createRole(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, name, role }: IRoleRegisterDto = req.body;
			if (!email || !password || !name || !role) {
				res.status(400).json({
					message: 'Invalid user data. email, password, name and role are required.',
				});
				return;
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const inforole = await this.roleService.createRole(email, hashedPassword, name, role);
			res.status(201).json(inforole);
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
	public async getRoleById(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Role ID is required' });
				return;
			}
			const role = await this.roleService.getRoleById(id);
			if (!role) {
				res.status(404).json({ message: 'Role not found' });
				return;
			}
			res.status(200).json(role);
		} catch (error) {
			if (error instanceof Error) {
				res
					.status(500)
					.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
			}
		}
	}
	public async updateRole(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Role ID is required' });
				return;
			}
			const role = await this.roleService.getRoleById(id);
			if (!role) {
				res.status(404).json({ message: 'Role not found' });
				return;
			}
			const inforole = await this.roleService.updateDataRole(id, req.body);
			res.status(200).json(inforole);
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
	public async deleteRole(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Role ID is required' });
				return;
			}
			const role = await this.roleService.getRoleById(id);
			if (!role) {
				res.status(404).json({ message: 'Role not found' });
				return;
			}
			await this.roleService.deleteRole(id);
			res.status(200).json({ message: 'Role deleted successfully' });
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
}
