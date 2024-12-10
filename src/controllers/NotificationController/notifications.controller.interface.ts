import { Request, Response } from 'express';

export interface INotificationController {
	createNotificationForPromotion: (req: Request, res: Response) => Promise<void>;
	getNotificationsByUser: (req: Request, res: Response) => Promise<void>;
	deleteNotificationForUser: (req: Request, res: Response) => Promise<void>;
}
