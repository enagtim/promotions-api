import { Promotion, PromotionStatus } from '@prisma/client';

export interface IPromotionRepository {
	create: (data: {
		title: string;
		description: string;
		status: PromotionStatus;
		supplierId: number;
		city: string;
		createdAt: Date;
		endDate: Date;
		startDate: Date;
		tagIds: number[];
	}) => Promise<Promotion>;
	getById: (promotionId: number) => Promise<Promotion | null>;
	getBySupplier: (supplierId: number) => Promise<Promotion[] | []>;
	getPromotionsByCityAndTags: (city: string, tagIds: number[]) => Promise<Promotion[] | []>;
	updateStatus: (promotionId: number, status: PromotionStatus) => Promise<Promotion>;
	delete: (promotionId: number) => Promise<void>;
}
