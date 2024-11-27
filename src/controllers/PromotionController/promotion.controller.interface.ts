import { Request, Response } from 'express';

export interface IPromotionController {
	createPromotion: (req: Request, res: Response) => Promise<void>;
	getPromotionsBySupplier: (req: Request, res: Response) => Promise<void>;
	getPromotionsByCityAndTags: (req: Request, res: Response) => Promise<void>;
	updatePromotionStatus: (req: Request, res: Response) => Promise<void>;
	deletePromotion: (req: Request, res: Response) => Promise<void>;
}
