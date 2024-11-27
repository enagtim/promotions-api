import { User } from '@prisma/client';

export interface IUserService {
	createUser: (userdata: { city: string }) => Promise<User | null>;
	getUserById: (id: number) => Promise<User | null>;
	updateUser: (id: number, userdata: { city: string }) => Promise<User | null>;
}
