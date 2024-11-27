import { Notification, PrismaClient } from '@prisma/client';
import { INotificationRepository } from './notification.repository.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../type';

@injectable()
export class NotificationRepository implements INotificationRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async createNotification(promotionId: number, userIds: number[]): Promise<void> {
		await this.prisma.notification.createMany({
			data: userIds.map((userId) => ({ userId, promotionId })),
		});
	}
	public async getNotifications(userId: number): Promise<Notification[] | null> {
		return this.prisma.notification.findMany({
			where: { id: userId },
			include: { promotion: true },
		});
	}
	public async deleteNotification(id: number): Promise<void> {
		await this.prisma.notification.delete({
			where: { id },
		});
	}
}
