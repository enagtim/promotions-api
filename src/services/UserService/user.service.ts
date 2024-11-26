import { inject, injectable } from 'inversify';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { User } from '@prisma/client';
import { IUserRepository } from '../../repositories/UsersRepository/user.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}
	public async createUser(userdata: { city: string }): Promise<User | null> {
		return this.userRepository.create(userdata);
	}
	public async getUserById(id: number): Promise<User | null> {
		return this.userRepository.getUser(id);
	}
	public async getUsersByTagsAndCity(tagIds: number[], city: string): Promise<User[] | null> {
		return this.userRepository.getUsersByTagsAndCity(tagIds, city);
	}
	public async updateUser(id: number, userdata: { city: string }): Promise<User | null> {
		await this.userRepository.getUser(id);
		return this.userRepository.updateData(id, userdata);
	}
}
