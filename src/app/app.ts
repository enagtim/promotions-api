import express, { Express } from 'express';
import { Server } from 'http';
import { Container, inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../type';
import { PrismaClient } from '@prisma/client';
import { setupAuthRoutes } from '../routes/auth.routes';
import dotenv from 'dotenv';
import { setupRolesRoutes } from '../routes/roles.routes';
import { setupPromotionsRoutes } from '../routes/promotion.routes';
import { setupTagsRoutes } from '../routes/tags.routes';
import { setupUsersRoutes } from '../routes/users.routes';
import { setupNotificationRoutes } from '../routes/notification.routes';

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {
		this.app = express();
		this.port = 8000;
	}
	public async init(appContainer: Container) {
		this.app.use(express.json());
		this.app.use(setupAuthRoutes(appContainer));
		this.app.use(setupRolesRoutes(appContainer));
		this.app.use(setupPromotionsRoutes(appContainer));
		this.app.use(setupUsersRoutes(appContainer));
		this.app.use(setupTagsRoutes(appContainer));
		this.app.use(setupNotificationRoutes(appContainer));
		dotenv.config();
		await this.prisma.$connect();
		this.server = this.app.listen(this.port, () => {
			console.log(`Server start on http://localhost:${this.port}`);
		});
	}
}
