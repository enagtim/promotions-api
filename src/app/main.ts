import { PrismaClient } from '@prisma/client';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../type';
import { IRoleRepository } from '../repositories/RoleRepository/role.repository.interface';
import { RoleRepository } from '../repositories/RoleRepository/role.repository';
import { IPromotionRepository } from '../repositories/PromotionRepository/promotion.repository.interface';
import { PromotionRepository } from '../repositories/PromotionRepository/promotion.repository';
import { App } from './app';
import { IRoleService } from '../services/RoleService/role.service.interface';
import { RoleService } from '../services/RoleService/role.service';
import { IPromotionService } from '../services/PromotionService/promotion.service.interface';
import { PromotionService } from '../services/PromotionService/promotion.service';
import { IRoleController } from '../controllers/RoleController/role.controller.interface';
import { RoleController } from '../controllers/RoleController/role.controller';
import { IPromotionController } from '../controllers/PromotionController/promotion.controller.interface';
import { PromotionController } from '../controllers/PromotionController/promotion.controller';
import { IAuthService } from '../services/AuthService/auth.service.interface';
import { AuthService } from '../services/AuthService/auth.service';
import { IAuthController } from '../controllers/AuthController/auth.controller.interface';
import { AuthController } from '../controllers/AuthController/auth.controller';
import { IUserRepository } from '../repositories/UsersRepository/user.repository.interface';
import { UserRepository } from '../repositories/UsersRepository/users.repository';
import { IUserService } from '../services/UserService/user.service.interface';
import { UserService } from '../services/UserService/user.service';
import { IUserController } from '../controllers/UserController/user.controller.interface';
import { UserController } from '../controllers/UserController/user.controller';
import { ITagRepository } from '../repositories/TagsRepository/tag.repository.interface';
import { TagRepository } from '../repositories/TagsRepository/tag.repository';
import { ITagService } from '../services/TagsService/tag.service.interface';
import { TagService } from '../services/TagsService/tag.service';
import { ITagController } from '../controllers/TagController/tag.controller.interface';
import { TagController } from '../controllers/TagController/tag.controller';
import { INotificationRepository } from '../repositories/NotificationRepository/notification.repository.interface';
import { NotificationRepository } from '../repositories/NotificationRepository/notification.repository';
import { INotificationService } from '../services/NotificationService/notification.service.interface';
import { NotificationService } from '../services/NotificationService/notification.service';
import { INotificationController } from '../controllers/NotificationController/notifications.controller.interface';
import { NotificationController } from '../controllers/NotificationController/notification.controller';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
	bind<IRoleRepository>(TYPES.RoleRepository).to(RoleRepository);
	bind<IRoleService>(TYPES.RoleService).to(RoleService);
	bind<IRoleController>(TYPES.RoleController).to(RoleController);
	bind<IPromotionRepository>(TYPES.PromotionRepository).to(PromotionRepository);
	bind<IPromotionService>(TYPES.PromotionService).to(PromotionService);
	bind<IPromotionController>(TYPES.PromotionController).to(PromotionController);
	bind<IAuthService>(TYPES.AuthService).to(AuthService);
	bind<IAuthController>(TYPES.AuthController).to(AuthController);
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<ITagRepository>(TYPES.TagRepository).to(TagRepository);
	bind<ITagService>(TYPES.TagService).to(TagService);
	bind<ITagController>(TYPES.TagController).to(TagController);
	bind<INotificationRepository>(TYPES.NotificationRepository).to(NotificationRepository);
	bind<INotificationService>(TYPES.NotificationService).to(NotificationService);
	bind<INotificationController>(TYPES.NotificationController).to(NotificationController);
	bind<App>(TYPES.Application).to(App);
});
async function bootstrap(): Promise<{ appContainer: Container; app: App }> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init(appContainer);
	return { appContainer, app };
}

export const boot = bootstrap();
