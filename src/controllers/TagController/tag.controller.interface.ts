import { Response, Request } from 'express';

export interface ITagController {
	createTag: (req: Request, res: Response) => Promise<void>;
	getAllTags: (req: Request, res: Response) => Promise<void>;
	addTagsToUser: (req: Request, res: Response) => Promise<void>;
	removeTagsFromUser: (req: Request, res: Response) => Promise<void>;
	getTagsByUserId: (req: Request, res: Response) => Promise<void>;
}
