import { Router } from 'express';
import { Container } from 'inversify';
import { TagController } from '../controllers/TagController/tag.controller';
import { TYPES } from '../type';
import { authenticate } from '../middlewares/authenticate';
import { checkRole } from '../middlewares/сheckrole';

export function getTagsRoutes(appContainer: Container): Router {
	const tagRouter = Router();
	const usersController = appContainer.get<TagController>(TYPES.TagController);
	tagRouter.post('/tag/create', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.createTag(req, res);
	});
	tagRouter.post('tag/add/user', (req, res) => {
		return usersController.addTagsToUser(req, res);
	});
	tagRouter.get('/all', (req, res) => {
		return usersController.getAllTags(req, res);
	});
	tagRouter.get('/all/user', (req, res) => {
		return usersController.getTagsByUserId(req, res);
	});
	tagRouter.delete('/tag/remove/user', (req, res) => {
		return usersController.removeTagsFromUser(req, res);
	});
	return tagRouter;
}
export function setupTagsRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/tags', getTagsRoutes(appContainer));
	return router;
}
