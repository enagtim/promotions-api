import { Tag } from '@prisma/client';

export interface ITagService {
	createTag: (tagdata: { name: string }) => Promise<Tag | null>;
	getAllTags: () => Promise<Tag[] | null>;
	addTagsToUser: (userId: number, tagIds: number[]) => Promise<void>;
	removeTagsFromUser: (userId: number, tagIds: number[]) => Promise<void>;
	getTagsByUserId: (userId: number) => Promise<Tag[] | null>;
}
