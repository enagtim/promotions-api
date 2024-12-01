import { Tag } from '@prisma/client';

export interface ITagRepository {
	createTag: (name: string) => Promise<Tag>;
	getAllTags: () => Promise<Tag[] | []>;
	addTagsToUser: (userId: number, tagIds: number[]) => Promise<void>;
	removeTagsFromUser: (userId: number, tagIds: number[]) => Promise<void>;
	getTagsByUserId: (userId: number) => Promise<Tag[] | []>;
}
