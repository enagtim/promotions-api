import { inject, injectable } from 'inversify';
import { ITagController } from './tag.controller.interface';
import { TYPES } from '../../type';
import { ITagService } from '../../services/TagsService/tag.service.interface';
import 'reflect-metadata';
import { Request, Response } from 'express';
import { Tag } from '@prisma/client';

@injectable()
export class TagController implements ITagController {
	constructor(@inject(TYPES.TagService) private tagservice: ITagService) {}
	public async createTag(req: Request, res: Response): Promise<void> {
		try {
			const { name } = req.body as Tag;
			if (!name) {
				res.status(400).json({ message: 'Tag name is required' });
				return;
			}
			const tag = await this.tagservice.createTag({ name });
			res.status(201).json(tag);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async getAllTags(req: Request, res: Response): Promise<void> {
		try {
			const tags = await this.tagservice.getAllTags();
			res.status(200).json(tags);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async addTagsToUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId, tagIds } = req.body;
			if (!userId || !tagIds || tagIds.length === 0) {
				res.status(400).json({ message: 'User ID and Tag IDs are required' });
				return;
			}
			await this.tagservice.addTagsToUser(userId, tagIds);
			res.status(201).json({ message: 'Tags added successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async removeTagsFromUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId, tagIds } = req.body;
			if (!userId || !tagIds || tagIds.length === 0) {
				res.status(400).json({ message: 'User ID and Tag IDs are required' });
				return;
			}
			await this.tagservice.removeTagsFromUser(userId, tagIds);
			res.status(200).json({ message: 'Tags removed successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async getTagsByUserId(req: Request, res: Response): Promise<void> {
		try {
			const userId = Number(req.query.id);
			if (!userId) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const tags = await this.tagservice.getTagsByUserId(userId);
			res.status(200).json(tags);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
