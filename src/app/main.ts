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
import { PromitionService } from '../services/PromotionService/promotion.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
	bind<IPromotionRepository>(TYPES.PromotionRepository).to(PromotionRepository);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IPromotionService>(TYPES.PromotionService).to(PromitionService);
	bind<App>(TYPES.Application).to(App);
});
function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}
export const { app, appContainer } = bootstrap();
