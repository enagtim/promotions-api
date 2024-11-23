import { User, UserRole } from '@prisma/client';

export interface IUserService {
	createUser: (userdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}) => Promise<User>;
	getUserById: (id: number) => Promise<User | null>;
	updateDataUser: (
		userId: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	) => Promise<User>;
	deleteUser: (id: number) => Promise<User>;
}
