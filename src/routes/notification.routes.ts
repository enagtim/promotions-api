import { Router } from 'express';
import { Container } from 'inversify';
import { TYPES } from '../type';
import { NotificationController } from '../controllers/NotificationController/notification.controller';

export function getNotificationRoutes(appContainer: Container): Router {
	const notificationRouter = Router();
	const notificationController = appContainer.get<NotificationController>(
		TYPES.NotificationController,
	);
	notificationRouter.post('/notification/create', (req, res) => {
		return notificationController.createNotificationForPromotion(req, res);
	});
	notificationRouter.get('/all/user', (req, res) => {
		return notificationController.getNotificationsByUser(req, res);
	});
	notificationRouter.delete('/notification/remove', (req, res) => {
		return notificationController.deleteNotificationForUser(req, res);
	});
	return notificationRouter;
}
export function setupNotificationRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/notifications', getNotificationRoutes(appContainer));
	return router;
}
