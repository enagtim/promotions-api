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
	}): Promise<Promotion> {
		return this.promotionRepository.create({ ...promotiondata, status: PromotionStatus.PENDING });
	}
	public async getPromotionBySupplier(supplierId: number): Promise<Promotion[]> {
		const promotions = (await this.promotionRepository.getBySupplier(supplierId)) || [];
		return promotions;
	}
	public async updateStatusPromotion(
		promotionId: number,
		status: PromotionStatus,
	): Promise<Promotion | null> {
		const promotion = await this.promotionRepository.getById(promotionId);
		if (!promotion) {
			throw new Error(`Promotion ID №${promotionId} not found!`);
		}
		return this.promotionRepository.updateStatus(promotionId, status);
	}
	public async deletePromotion(promotionId: number): Promise<Promotion | null> {
		const promotion = await this.promotionRepository.getById(promotionId);
		if (!promotion) {
			throw new Error(`Promotion ID №${promotionId} not found!`);
		}
		return this.promotionRepository.delete(promotionId);
	}
}
