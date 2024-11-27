import { Router } from 'express';
import { Container } from 'inversify';
import { UserController } from '../controllers/UserController/user.controller';
import { TYPES } from '../type';

export function getUsersRoutes(appContainer: Container): Router {
	const usersRouter = Router();
	const usersController = appContainer.get<UserController>(TYPES.UserController);
	usersRouter.post('/user/create', (req, res) => {
		return usersController.createUserBot(req, res);
	});
	usersRouter.get('/user', (req, res) => {
		return usersController.getUserBot(req, res);
	});
	usersRouter.get('/all', (req, res) => {
		return usersController.getAllUsers(req, res);
	});
	usersRouter.get('/all/tag/city', (req, res) => {
		return usersController.getUsersByTagsAndCity(req, res);
	});
	usersRouter.patch('/user/update', (req, res) => {
		return usersController.updateUserData(req, res);
	});
	return usersRouter;
}
export function setupUsersRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/users', getUsersRoutes(appContainer));
	return router;
}
