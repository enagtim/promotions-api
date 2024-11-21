import { Request, Response } from 'express';
import { IPromotionController } from './promotion.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IPromotionService } from '../../services/PromotionService/promotion.service.interface';
import 'reflect-metadata';

@injectable()
export class PromotionController implements IPromotionController {
	constructor(@inject(TYPES.PromotionService) private promotionService: IPromotionService) {}

	// POST /promotions
	public async createPromotion(req: Request, res: Response): Promise<void> {
		try {
			const promotion = await this.promotionService.createPromotion(req.body);
			res.send(201).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	// GET /promotions/supplier/:id
	public async getPromotionsBySupplier(req: Request, res: Response): Promise<void> {
		try {
			const promotions = await this.promotionService.getPromotionBySupplier(Number(req.params.id));
			if (!promotions) {
				res.status(404).json({ message: 'Promotions not found!' });
				return;
			}
			res.status(200).json(promotions);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	// PATCH /promotions/:id/status
	public async updatePromotionStatus(req: Request, res: Response): Promise<void> {
		try {
			const promotion = await this.promotionService.updateStatusPromotion(
				Number(req.params.id),
				req.body.status,
			);
			if (!promotion) {
				res.status(404).json({ message: 'Promotion not found' });
				return;
			}
			res.status(200).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	// DELETE /promotions/:id
	public async deletePromotion(req: Request, res: Response): Promise<void> {
		try {
			const promotion = await this.promotionService.deletePromotion(Number(req.params.id));
			if (!promotion) {
				res.status(404).json('Promotion not found');
				return;
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
