import { User, UserRole } from '@prisma/client';

export interface IUserRepository {
	create: (userdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}) => Promise<User>;
	getById: (id: number) => Promise<User | null>;
	getByEmail: (email: string) => Promise<User | null>;
	getByRole: (role: UserRole) => Promise<User | null>;
	update: (
		id: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	) => Promise<User>;
	delete: (id: number) => Promise<User>;
}
