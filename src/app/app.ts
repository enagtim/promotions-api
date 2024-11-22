import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../type';
import { PrismaClient } from '@prisma/client';

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {
		this.app = express();
		this.port = 8000;
	}
	public async init() {
		await this.prisma.$connect();
		this.server = this.app.listen(this.port, () => {
			console.log(`Сервер запущен на http://localhost:${this.port}`);
		});
	}
}
