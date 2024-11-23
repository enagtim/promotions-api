import { PrismaClient, User, UserRole } from '@prisma/client';
import { IUserRepository } from './user.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(userdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}): Promise<User> {
		const user = await this.prisma.user.create({
			data: userdata,
		});
		return user;
	}
	public async getById(id: number): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		return user;
	}
	public async getByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		return user;
	}
	public async getByRole(role: UserRole): Promise<User | null> {
		const user = await this.prisma.user.findFirst({
			where: { role },
		});
		return user;
	}
	public async update(
		id: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	): Promise<User> {
		const updateuser = await this.prisma.user.update({
			where: { id },
			data: userData,
		});
		return updateuser;
	}
	public async delete(id: number): Promise<User> {
		const deleteuser = await this.prisma.user.delete({
			where: { id },
		});
		return deleteuser;
	}
}
