import { UserRole, User } from '@prisma/client';
import { IUserService } from './user.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IUserRepository } from '../../repositories/UsersRepository/user.repository.interface';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}
	public async createUser(data: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}): Promise<User> {
		const existedUser = await this.userRepository.getByEmail(data.email);
		if (existedUser) {
			throw new Error(`Пользователь с email ${data.email} уже существует!`);
		}
		const hashedPassword = await bcrypt.hash(data.password, 10);
		return this.userRepository.create({ ...data, password: hashedPassword });
	}
	public async getUserById(userId: number): Promise<User | null> {
		const user = await this.userRepository.getById(userId);
		if (!user) {
			throw new Error(`Пользователь с ID №${userId} не найден`);
		}
		return user;
	}
	public async updateDataUser(
		userId: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	): Promise<User> {
		const user = await this.userRepository.getById(userId);
		if (!user) {
			throw new Error(`Пользователь с ID №${userId} не найден`);
		}
		return this.userRepository.update(userId, userData);
	}
	public async deleteUser(userId: number): Promise<User> {
		const user = await this.userRepository.getById(userId);
		if (!user) {
			throw new Error(`Пользователь с ID №${userId} не найден`);
		}
		return this.userRepository.delete(userId);
	}
}
