import { Request, Response } from 'express';
import { INotificationController } from './notifications.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { INotificationService } from '../../services/NotificationService/notification.service.interface';
import { INotificationDTO } from '../../dto/notifications.dto.interface';

@injectable()
export class NotificationController implements INotificationController {
	constructor(
		@inject(TYPES.NotificationService) private notificationservice: INotificationService,
	) {}
	public async createNotificationForPromotion(req: Request, res: Response): Promise<void> {
		try {
			const { promotionId, userIds }: INotificationDTO = req.body;

			if (!promotionId || !userIds) {
				res.status(400).json({ message: 'PromotionId or userIds is required.' });
				return;
			}
			await this.notificationservice.createNotificationForPromotion(promotionId, userIds);
			res.status(201).json({ message: 'Notifications created.' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).json({ message: error.message });
			}
		}
	}
	public async getNotificationsByUser(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required.' });
				return;
			}
			const notifications = await this.notificationservice.getNotificationsByUser(id);
			res.status(200).json(notifications);
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).json({ message: error.message });
			}
		}
	}
	public async deleteNotificationForUser(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Id notification is required' });
				return;
			}
			await this.notificationservice.deleteNotificationById(id);
			res.status(200).json({ message: 'User notification deleted successfully.' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).json({ message: error.message });
			}
		}
	}
}
