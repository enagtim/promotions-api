import { Router } from 'express';
import { Container } from 'inversify';
import { TYPES } from '../type';
import { UserController } from '../controllers/UserController/user.controller';
import { authenticate } from '../middlewares/authenticate';
import { checkRole } from '../middlewares/сheckrole';

export function getUsersRoutes(appContainer: Container): Router {
	const usersRouter = Router();
	const usersController = appContainer.get<UserController>(TYPES.UserController);
	usersRouter.post('/create', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.createUser(req, res);
	});
	usersRouter.get('/get', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.getUserById(req, res);
	});
	usersRouter.patch('/update', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.updateUser(req, res);
	});
	usersRouter.delete('/delete', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.deleteUser(req, res);
	});
	return usersRouter;
}
export function setupUsersRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/users', getUsersRoutes(appContainer));
	return router;
}
