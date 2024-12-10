import { inject, injectable } from 'inversify';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { User } from '@prisma/client';
import { IUserRepository } from '../../repositories/UsersRepository/user.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}
	public async createUser(city: string): Promise<User> {
		return this.userRepository.create(city);
	}
	public async getAllUser(): Promise<User[] | []> {
		return this.userRepository.getAllUser();
	}
	public async updateUser(id: number, city: string): Promise<User> {
		return this.userRepository.updateData(id, city);
	}
}
