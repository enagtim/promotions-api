import { User } from '@prisma/client';

export interface IUserRepository {
	create: (city: string) => Promise<User>;
	getAllUser: () => Promise<User[] | []>;
	updateData: (id: number, city: string) => Promise<User>;
}
