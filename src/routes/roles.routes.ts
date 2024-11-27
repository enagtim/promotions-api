import { Router } from 'express';
import { Container } from 'inversify';
import { TYPES } from '../type';
import { RoleController } from '../controllers/RoleController/role.controller';
import { authenticate } from '../middlewares/authenticate';
import { checkRole } from '../middlewares/сheckrole';

export function getRolesRoutes(appContainer: Container): Router {
	const usersRouter = Router();
	const usersController = appContainer.get<RoleController>(TYPES.RoleController);
	usersRouter.post('/role/create', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.createRole(req, res);
	});
	usersRouter.get('/role', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.getRoleById(req, res);
	});
	usersRouter.patch('/role/update', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.updateRole(req, res);
	});
	usersRouter.delete('/role/remove', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.deleteRole(req, res);
	});
	return usersRouter;
}
export function setupRolesRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/roles', getRolesRoutes(appContainer));
	return router;
}
