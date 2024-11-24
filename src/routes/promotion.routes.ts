import { Router } from 'express';
import { Container } from 'inversify';
import { PromotionController } from '../controllers/PromotionController/promotion.controller';
import { TYPES } from '../type';
import { authenticate } from '../middlewares/authenticate';
import { checkRole } from '../middlewares/сheckrole';

export function getPromotionsUser(appContainer: Container): Router {
	const promotionRouter = Router();
	const promotionController = appContainer.get<PromotionController>(TYPES.PromotionController);
	promotionRouter.post('/create', authenticate, checkRole('SUPPLIER'), (req, res) => {
		return promotionController.createPromotion(req, res);
	});
	promotionRouter.get('/get', authenticate, checkRole('SUPPLIER'), (req, res) => {
		return promotionController.getPromotionsBySupplier(req, res);
	});
	promotionRouter.patch('/update', authenticate, checkRole('ADMIN'), (req, res) => {
		return promotionController.updatePromotionStatus(req, res);
	});
	promotionRouter.delete('/delete', authenticate, checkRole('ADMIN'), (req, res) => {
		return promotionController.deletePromotion(req, res);
	});
	return promotionRouter;
}
export function setupPromotionsRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/promotions', getPromotionsUser(appContainer));
	return router;
}
