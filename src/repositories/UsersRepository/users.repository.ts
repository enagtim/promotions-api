import { inject, injectable } from 'inversify';
import { IUserRepository } from './user.repository.interface';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { PrismaClient, User } from '@prisma/client';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(userdata: { city: string }): Promise<User | null> {
		return this.prisma.user.create({
			data: userdata,
		});
	}
	public async getUser(id: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}
	public async updateData(id: number, userdata: { city: string }): Promise<User | null> {
		return this.prisma.user.update({
			where: { id },
			data: userdata,
		});
	}
}
