import { Request, Response } from 'express';
import { IPromotionController } from './promotion.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IPromotionService } from '../../services/PromotionService/promotion.service.interface';
import 'reflect-metadata';
@injectable()
export class PromotionController implements IPromotionController {
	constructor(@inject(TYPES.PromotionService) private promotionService: IPromotionService) {}
	public async createPromotion(req: Request, res: Response): Promise<void> {
		try {
			const { title, description, supplierId, city, startDate, endDate, tagIds } = req.body;

			if (!title || !description || !supplierId || !city || !startDate || !endDate || !tagIds) {
				res.status(400).json({ message: 'Missing required fields.' });
				return;
			}

			const promotion = await this.promotionService.createPromotion({
				title,
				description,
				supplierId,
				city,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				createdAt: new Date(),
				tagIds,
			});
			res.status(201).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
	public async getPromotionsBySupplier(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Supplier id is required' });
				return;
			}
			const promotions = (await this.promotionService.getPromotionBySupplier(id)) || [];
			res.status(200).json(promotions);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
	public async getPromotionsByCityAndTags(req: Request, res: Response): Promise<void> {
		try {
			const { city, tagIds }: { city: string; tagIds: number[] } = req.body;
			if (!city || !tagIds) {
				res.status(400).json({ message: 'Missing city or tagIds.' });
				return;
			}
			const promotions =
				(await this.promotionService.getPromotionsByCityAndTags(city, tagIds)) || [];
			res.status(200).json(promotions);
		} catch (error) {
			res.status(500).json({ message: 'Internal server error.' });
		}
	}
	public async updatePromotionStatus(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Promotion id is required' });
				return;
			}
			const promotion = await this.promotionService.updateStatusPromotion(id, req.body.status);
			if (!promotion) {
				res.status(404).json({ message: 'Promotion not found' });
				return;
			}
			res.status(200).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			}
		}
	}
	public async deletePromotion(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Promotion id is required' });
				return;
			}
			const promotion = await this.promotionService.deletePromotion(id);
			res.status(200).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(404).json({ message: error.message });
			}
		}
	}
}
