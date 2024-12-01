import { PromotionStatus } from '@prisma/client';

export interface IPromotionDto {
	title: string;
	description: string;
	status: PromotionStatus;
	supplierId: number;
	city: string;
	createdAt: Date;
	endDate: Date;
	startDate: Date;
	tagIds: number[];
}
