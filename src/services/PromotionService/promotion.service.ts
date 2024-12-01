import { PromotionStatus, Promotion } from '@prisma/client';
import { IPromotionService } from './promotion.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { IPromotionRepository } from '../../repositories/PromotionRepository/promotion.repository.interface';

@injectable()
export class PromotionService implements IPromotionService {
	constructor(
		@inject(TYPES.PromotionRepository) private promotionRepository: IPromotionRepository,
	) {}
	public async createPromotion(promotiondata: {
		title: string;
		description: string;
		supplierId: number;
		city: string;
		startDate: Date;
		endDate: Date;
		createdAt: Date;
		tagIds: number[];
	}): Promise<Promotion | null> {
		return this.promotionRepository.create({ ...promotiondata, status: PromotionStatus.PENDING });
	}
	public async getPromotionBySupplier(supplierId: number): Promise<Promotion[] | []> {
		return (await this.promotionRepository.getBySupplier(supplierId)) || [];
	}
	public async getPromotionsByCityAndTags(
		city: string,
		tagIds: number[],
	): Promise<Promotion[] | []> {
		return this.promotionRepository.getPromotionsByCityAndTags(city, tagIds);
	}
	public async getByIdPromotion(promotionId: number): Promise<Promotion | null> {
		return this.promotionRepository.getById(promotionId);
	}
	public async updateStatusPromotion(
		promotionId: number,
		status: PromotionStatus,
	): Promise<Promotion | null> {
		return this.promotionRepository.updateStatus(promotionId, status);
	}
	public async deletePromotion(promotionId: number): Promise<void> {
		if (!promotionId) {
			throw new Error('Promotion not found');
		}
		await this.promotionRepository.delete(promotionId);
	}
}
