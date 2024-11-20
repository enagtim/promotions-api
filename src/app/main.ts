import { PrismaClient } from '@prisma/client';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../type';
import { IUserRepisitory } from '../repositories/UsersRepository/user.repository.interface';
import { UserRepository } from '../repositories/UsersRepository/user.repository';
import { IPromotionRepository } from '../repositories/PromotionRepository/promotion.repository.interface';
import { PromotionRepository } from '../repositories/PromotionRepository/promotion.repository';
import { App } from './app';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
	bind<IUserRepisitory>(TYPES.UserRepository).to(UserRepository);
	bind<IPromotionRepository>(TYPES.PromotionRepository).to(PromotionRepository);
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
