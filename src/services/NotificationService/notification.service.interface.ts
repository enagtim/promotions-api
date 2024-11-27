import { Notification } from '@prisma/client';

export interface INotificationService {
	createNotificationForPromotion: (promotionId: number, userIds: number[]) => Promise<void>;
	getNotificationsByUser: (userId: number) => Promise<Notification[] | null>;
	deleteNotificationForUser: (id: number) => Promise<void>;
}
