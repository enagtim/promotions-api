import { User } from '@prisma/client';

export interface IUserService {
	createUser: (city: string) => Promise<User>;
	getAllUser: () => Promise<User[] | []>;
	updateUser: (id: number, city: string) => Promise<User>;
}
