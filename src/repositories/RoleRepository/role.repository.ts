import { PrismaClient, InfoRole, Role } from '@prisma/client';
import { IRoleRepository } from './role.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';

@injectable()
export class RoleRepository implements IRoleRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(roledata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}): Promise<InfoRole> {
		return this.prisma.infoRole.create({
			data: roledata,
		});
	}
	public async getById(id: number): Promise<InfoRole | null> {
		return this.prisma.infoRole.findUnique({
			where: { id },
		});
	}
	public async getByEmail(email: string): Promise<InfoRole | null> {
		return this.prisma.infoRole.findUnique({
			where: { email },
		});
	}
	public async getByRole(inforole: Role): Promise<InfoRole | null> {
		return this.prisma.infoRole.findFirst({
			where: { role: inforole },
		});
	}
	public async update(
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	): Promise<InfoRole> {
		return this.prisma.infoRole.update({
			where: { id },
			data: roledata,
		});
	}
	public async delete(id: number): Promise<InfoRole> {
		return this.prisma.infoRole.delete({
			where: { id },
		});
	}
}
