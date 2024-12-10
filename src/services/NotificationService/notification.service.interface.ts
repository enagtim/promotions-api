import { Notification } from '@prisma/client';

export interface INotificationService {
	createNotificationForPromotion: (promotionId: number, userIds: number[]) => Promise<void>;
	getNotificationsByUser: (userId: number) => Promise<Notification[] | []>;
	deleteNotificationById: (id: number) => Promise<void>;
}
