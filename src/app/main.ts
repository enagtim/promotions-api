import { PrismaClient } from '@prisma/client';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../type';
import { IUserRepository } from '../repositories/UsersRepository/user.repository.interface';
import { UserRepository } from '../repositories/UsersRepository/user.repository';
import { IPromotionRepository } from '../repositories/PromotionRepository/promotion.repository.interface';
import { PromotionRepository } from '../repositories/PromotionRepository/promotion.repository';
import { App } from './app';
import { IUserService } from '../services/UserService/user.service.interface';
import { UserService } from '../services/UserService/user.service';
import { IPromotionService } from '../services/PromotionService/promotion.service.interface';
import { PromotionService } from '../services/PromotionService/promotion.service';
import { IUserController } from '../controllers/UserController/user.controller.interface';
import { UserController } from '../controllers/UserController/user.controller';
import { IPromotionController } from '../controllers/PromotionController/promotion.controller.interface';
import { PromotionController } from '../controllers/PromotionController/promotion.controller';
import { IAuthService } from '../services/AuthService/auth.service.interface';
import { AuthService } from '../services/AuthService/auth.service';
import { IAuthController } from '../controllers/AuthController/auth.controller.interface';
import { AuthController } from '../controllers/AuthController/auth.controller';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IPromotionRepository>(TYPES.PromotionRepository).to(PromotionRepository);
	bind<IPromotionService>(TYPES.PromotionService).to(PromotionService);
	bind<IPromotionController>(TYPES.PromotionController).to(PromotionController);
	bind<IAuthService>(TYPES.AuthService).to(AuthService);
	bind<IAuthController>(TYPES.AuthController).to(AuthController);
	bind<App>(TYPES.Application).to(App);
});
function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init(appContainer);
	return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
