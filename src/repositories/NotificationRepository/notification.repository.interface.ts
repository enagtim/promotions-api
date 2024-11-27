import { Notification } from '@prisma/client';

export interface INotificationRepository {
	createNotification: (promotionId: number, userIds: number[]) => Promise<void>;
	getNotifications: (userId: number) => Promise<Notification[] | null>;
	deleteNotification: (id: number) => Promise<void>;
}
