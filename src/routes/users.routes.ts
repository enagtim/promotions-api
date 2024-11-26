import { Router } from 'express';
import { Container } from 'inversify';
import { UserController } from '../controllers/UserController/user.controller';
import { TYPES } from '../type';

export function getUsersRoutes(appContainer: Container): Router {
	const usersRouter = Router();
	const usersController = appContainer.get<UserController>(TYPES.UserController);
	usersRouter.post('/create', (req, res) => {
		return usersController.createUserBot(req, res);
	});
	usersRouter.get('/get-user', (req, res) => {
		return usersController.getUserBot(req, res);
	});
	usersRouter.get('/get-user-city', (req, res) => {
		return usersController.getUsersByTagsAndCity(req, res);
	});
	usersRouter.patch('/update', (req, res) => {
		return usersController.updateUserData(req, res);
	});
	return usersRouter;
}
export function setupUsersRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/users', getUsersRoutes(appContainer));
	return router;
}
