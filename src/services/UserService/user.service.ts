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
	public async createUser(userdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}): Promise<User> {
		const existedUser = await this.userRepository.getByEmail(userdata.email);
		if (existedUser) {
			throw new Error(`User ${userdata.email} is existed!`);
		}
		const hashedPassword = await bcrypt.hash(userdata.password, 10);
		return this.userRepository.create({ ...userdata, password: hashedPassword });
	}
	public async getUserById(id: number): Promise<User | null> {
		const user = await this.userRepository.getById(id);
		return user;
	}
	public async updateDataUser(
		id: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	): Promise<User> {
		await this.userRepository.getById(id);
		if (userData.password) {
			userData.password = await bcrypt.hash(userData.password, 10);
		}
		return this.userRepository.update(id, userData);
	}
	public async deleteUser(id: number): Promise<User> {
		await this.userRepository.getById(id);
		return this.userRepository.delete(id);
	}
}
