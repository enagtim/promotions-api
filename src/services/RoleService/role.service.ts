import { Role, InfoRole } from '@prisma/client';
import { IRoleService } from './role.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IRoleRepository } from '../../repositories/RoleRepository/role.repository.interface';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';

@injectable()
export class RoleService implements IRoleService {
	constructor(@inject(TYPES.RoleRepository) private roleRepository: IRoleRepository) {}
	public async createRole(
		email: string,
		password: string,
		name: string,
		role: Role,
	): Promise<InfoRole> {
		const existedRole = await this.roleRepository.getByEmail(email);
		if (existedRole) {
			throw new Error(`Role ${email} is existed!`);
		}
		return this.roleRepository.create(email, password, name, role);
	}
	public async getRoleById(id: number): Promise<InfoRole | null> {
		return await this.roleRepository.getById(id);
	}
	public async updateDataRole(
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	): Promise<InfoRole | null> {
		if (roledata.password) {
			roledata.password = await bcrypt.hash(roledata.password, 10);
		}
		return this.roleRepository.update(id, roledata);
	}
	public async deleteRole(id: number): Promise<void> {
		await this.roleRepository.delete(id);
	}
}
