import { InfoRole, Role } from '@prisma/client';

export interface IRoleService {
	createRole: (email: string, password: string, name: string, role: Role) => Promise<InfoRole>;
	getRoleById: (id: number) => Promise<InfoRole | null>;
	updateDataRole: (
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	) => Promise<InfoRole | null>;
	deleteRole: (id: number) => Promise<void>;
}
