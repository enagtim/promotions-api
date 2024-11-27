import { User } from '@prisma/client';

export interface IUserRepository {
	create: (userdata: { city: string }) => Promise<User | null>;
	getUser: (id: number) => Promise<User | null>;
	updateData: (id: number, userdata: { city: string }) => Promise<User | null>;
}
