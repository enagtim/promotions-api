import { UserRole } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const checkRole = (requiredRole: UserRole) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const user = req.user;

		if (!user) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		if (user.role !== requiredRole) {
			res.status(403).json({ message: 'Role does not exist' });
			return;
		}
		next();
	};
};
