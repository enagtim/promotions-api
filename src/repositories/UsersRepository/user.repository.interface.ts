import { User, UserRole } from '@prisma/client';

export interface IUserRepository {
	create: (userdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}) => Promise<User>;
	getById: (userId: number) => Promise<User | null>;
	getByEmail: (email: string) => Promise<User | null>;
	getAll: () => Promise<User[] | null>;
	update: (
		userId: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	) => Promise<User>;
	delete: (userId: number) => Promise<User>;
}
