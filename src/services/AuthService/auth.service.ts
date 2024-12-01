import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IAuthService } from './auth.service.interface';
import { TYPES } from '../../type';
import { IRoleRepository } from '../../repositories/RoleRepository/role.repository.interface';
import { Role, InfoRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(TYPES.RoleRepository) private roleRepository: IRoleRepository) {}
	public async register(
		email: string,
		password: string,
		name: string,
		role: Role,
	): Promise<InfoRole> {
		return this.roleRepository.create(email, password, name, role);
	}
	public async getByRole(role: Role): Promise<InfoRole | null> {
		return this.roleRepository.getByRole(role);
	}
	public async login(email: string, password: string): Promise<{ token: string } | null> {
		const role = await this.roleRepository.getByEmail(email);
		if (!role) {
			return null;
		}
		const isPasswordIsValid = await bcrypt.compare(password, role.password);
		if (!isPasswordIsValid) {
			return null;
		}
		const token = jwt.sign(
			{ id: role.id, role: role.role },
			process.env.JWT_SECRET || 'default_secret',
			{
				expiresIn: '1h',
			},
		);
		return { token };
	}
}
