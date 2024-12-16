import { Role } from '@prisma/client';

export interface IRoleRegisterDto {
	email: string;
	password: string;
	name: string;
	role: Role;
}
