import { Notification } from '@prisma/client';

export interface INotificationRepository {
	createNotification: (promotionId: number, userIds: number[]) => Promise<void>;
	getNotificationsByUser: (id: number) => Promise<Notification[] | []>;
	deleteNotificationById: (id: number) => Promise<void>;
}
