import { Promotion, PromotionStatus } from '@prisma/client';

export interface IPromotionService {
	createPromotion: (promotiondata: {
		title: string;
		description: string;
		supplierId: number;
	}) => Promise<Promotion>;
	getPromotionBySupplier: (supplierId: number) => Promise<Promotion[] | null>;
	updateStatusPromotion: (
		promotionId: number,
		status: PromotionStatus,
	) => Promise<Promotion | null>;
	deletePromotion: (promotionId: number) => Promise<Promotion | null>;
}
