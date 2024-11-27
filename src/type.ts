import { TagRepository } from './repositories/TagsRepository/tag.repository';

export const TYPES = {
	PrismaClient: Symbol.for('PrismaClient'),
	PromotionRepository: Symbol.for('PromotionRepository'),
	PromotionService: Symbol.for('PromotionService'),
	PromotionController: Symbol.for('PromotionController'),
	RoleRepository: Symbol.for('RoleRepository'),
	RoleService: Symbol.for('RoleService'),
	RoleController: Symbol.for('RoleController'),
	AuthService: Symbol.for('AuthService'),
	AuthController: Symbol.for('AuthController'),
	UserRepository: Symbol.for('UserRepository'),
	UserService: Symbol.for('UserService'),
	UserController: Symbol.for('UserController'),
	TagRepository: Symbol.for('TagRepository'),
	TagService: Symbol.for('TagService'),
	TagController: Symbol.for('TagController'),
	Application: Symbol.for('Application'),
};
