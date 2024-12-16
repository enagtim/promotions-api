import { inject, injectable } from 'inversify';
import { ITagRepository } from './tag.repository.interface';
import { TYPES } from '../../type';
import { PrismaClient, Tag } from '@prisma/client';
import 'reflect-metadata';

@injectable()
export class TagRepository implements ITagRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async createTag(name: string): Promise<Tag> {
		return this.prisma.tag.create({
			data: { name },
		});
	}
	public async getAllTags(): Promise<Tag[] | []> {
		return this.prisma.tag.findMany();
	}
	public async addTagsToUser(userId: number, tagIds: number[]): Promise<void> {
		await this.prisma.userTag.createMany({
			data: tagIds.map((tagId) => ({
				userId,
				tagId,
			})),
			skipDuplicates: true,
		});
	}
	public async removeTagsFromUser(userId: number, tagIds: number[]): Promise<void> {
		await this.prisma.userTag.deleteMany({
			where: {
				userId,
				tagId: { in: tagIds },
			},
		});
	}
	public async getTagsByUserId(userId: number): Promise<Tag[] | []> {
		return this.prisma.tag.findMany({
			where: {
				users: {
					some: { userId },
				},
			},
		});
	}
}
