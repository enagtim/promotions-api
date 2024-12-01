import { Request, Response } from 'express';

export interface IUserController {
	createUserBot: (req: Request, res: Response) => Promise<void>;
	getAllUserBot: (req: Request, res: Response) => Promise<void>;
	updateUserData: (req: Request, res: Response) => Promise<void>;
}
