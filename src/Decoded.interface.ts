import { UserRole } from '@prisma/client';

export interface DecodedJwt {
	id: number;
	name: string;
	email: string;
	password: string;
	role: UserRole;
}
