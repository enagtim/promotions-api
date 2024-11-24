import { inject, injectable } from 'inversify';
import { IAuthService } from './auth.service.interface';
import { TYPES } from '../../type';
import { IUserRepository } from '../../repositories/UsersRepository/user.repository.interface';
import { UserRole, User } from '@prisma/client';
import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}
	public async register(registerdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}): Promise<User> {
		if (registerdata.role === 'ADMIN') {
			const admin = await this.userRepository.getByRole(registerdata.role);
			if (admin) {
				throw new Error(`Admin is existed!`);
			}
		}
		if (registerdata.role === 'SUPPLIER') {
			throw new Error('Only admin can register! We should wait until ADMIN create your account');
		}
		const hashedPassword = await bcrypt.hash(registerdata.password, 10);
		return this.userRepository.create({ ...registerdata, password: hashedPassword });
	}
	public async login(logingdata: { email: string; password: string }): Promise<{ token: string }> {
		const user = await this.userRepository.getByEmail(logingdata.email);
		if (!user) {
			throw new Error('Email or password not valid!');
		}
		const isPasswordIsValid = await bcrypt.compare(logingdata.password, user.password);
		if (!isPasswordIsValid) {
			throw new Error('Password invalid');
		}
		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET || 'default_secret',
			{
				expiresIn: '1h',
			},
		);
		return { token };
	}
}
