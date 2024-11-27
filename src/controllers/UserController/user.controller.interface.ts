import { Request, Response } from 'express';

export interface IUserController {
	createUserBot: (req: Request, res: Response) => Promise<void>;
	getUserBot: (req: Request, res: Response) => Promise<void>;
	getAllUsers: (req: Request, res: Response) => Promise<void>;
	getUsersByTagsAndCity: (req: Request, res: Response) => Promise<void>;
	updateUserData: (req: Request, res: Response) => Promise<void>;
}
