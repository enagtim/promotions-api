import { Router } from 'express';
import { Container } from 'inversify';
import { AuthController } from '../controllers/AuthController/auth.controller';
import { TYPES } from '../type';

export function getAuthRouter(appContainer: Container): Router {
	const authRouter = Router();
	const authController = appContainer.get<AuthController>(TYPES.AuthController);
	authRouter.post('/register', (req, res) => {
		return authController.register(req, res);
	});
	authRouter.post('/login', (req, res) => {
		return authController.login(req, res);
	});
	return authRouter;
}
export function setupAuthRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/auth', getAuthRouter(appContainer));
	return router;
}
