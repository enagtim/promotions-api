import { inject, injectable } from 'inversify';
import { IUserRepository } from './user.repository.interface';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { PrismaClient, User } from '@prisma/client';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(city: string): Promise<User> {
		return this.prisma.user.create({
			data: { city },
		});
	}
	public async getAllUser(): Promise<User[] | []> {
		return this.prisma.user.findMany();
	}
	public async updateData(id: number, city: string): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data: { city },
		});
	}
}
