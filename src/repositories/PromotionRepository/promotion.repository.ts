import { PrismaClient, Promotion, PromotionStatus } from '@prisma/client';
import { IPromotionRepository } from './promotion.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';

@injectable()
export class PromotionRepository implements IPromotionRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(promotionData: {
		title: string;
		description: string;
		status: PromotionStatus;
		supplierId: number;
		city: string;
		createdAt: Date;
		endDate: Date;
		startDate: Date;
		tagIds: number[];
	}): Promise<Promotion> {
		const { tagIds, ...promotionFields } = promotionData;
		return this.prisma.promotion.create({
			data: {
				...promotionFields,
				tags: {
					create: tagIds.map((tagId) => ({
						tag: { connect: { id: tagId } },
					})),
				},
			},
		});
	}
	public async getById(promotionId: number): Promise<Promotion | null> {
		return await this.prisma.promotion.findUnique({
			where: { id: promotionId },
		});
	}
	public async getBySupplier(supplierId: number): Promise<Promotion[] | null> {
		return this.prisma.promotion.findMany({
			where: { supplierId },
		});
	}
	public async getPromotionsByCityAndTags(
		city: string,
		tagIds: number[],
	): Promise<Promotion[] | null> {
		return this.prisma.promotion.findMany({
			where: {
				city,
				tags: {
					some: { tagId: { in: tagIds } },
				},
				status: PromotionStatus.APPROVED,
			},
			include: { tags: true },
		});
	}
	public async updateStatus(promotionId: number, status: PromotionStatus): Promise<Promotion> {
		return this.prisma.promotion.update({
			where: { id: promotionId },
			data: { status },
		});
	}
	public async delete(promotionId: number): Promise<Promotion> {
		return this.prisma.promotion.delete({
			where: { id: promotionId },
		});
	}
}
