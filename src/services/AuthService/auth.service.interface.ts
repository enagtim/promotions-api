import { User, UserRole } from '@prisma/client';

export interface IAuthService {
	register: (registerdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}) => Promise<User>;
	login: (logingdata: { email: string; password: string }) => Promise<{ token: string }>;
}
