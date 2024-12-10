import { InfoRole, Role } from '@prisma/client';

export interface IAuthService {
	register: (email: string, password: string, name: string, role: Role) => Promise<InfoRole>;
	getByRole: (role: Role) => Promise<InfoRole | null>;
	login: (email: string, password: string) => Promise<{ token: string } | null>;
}
