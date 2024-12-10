import { PrismaClient, Promotion, PromotionStatus } from '@prisma/client';
import { IPromotionRepository } from './promotion.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';
import { IPromotionDto } from '../../dto/promotion.dto.interface';

@injectable()
export class PromotionRepository implements IPromotionRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(promotionData: IPromotionDto): Promise<Promotion> {
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
	public async getBySupplier(supplierId: number): Promise<Promotion[] | []> {
		return this.prisma.promotion.findMany({
			where: { supplierId },
		});
	}
	public async getPromotionsByCityAndTags(
		city: string,
		tagIds: number[],
	): Promise<Promotion[] | []> {
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
	public async delete(promotionId: number): Promise<void> {
		await this.prisma.promotion.delete({
			where: { id: promotionId },
		});
	}
}
