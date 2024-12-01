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
	public async getNotificationsByUser(id: number): Promise<Notification[] | []> {
		return this.prisma.notification.findMany({
			where: { id },
			include: { promotion: true },
		});
	}
	public async deleteNotificationById(id: number): Promise<void> {
		await this.prisma.notification.delete({
			where: { id },
		});
	}
}
