import request from 'supertest';
import { App } from '../src/app/app';
import { boot } from '../src/app/main';

export let application: App;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});
describe('User e2e', () => {
	it('User-create-error: City is required', async () => {
		const res = await request(application.app).post('/users/user/create').send({
			citasasay: 'Нижний Новгород',
		});
		expect(res.statusCode).toBe(400);
	});
	it('User-update-error: User ID is required', async () => {
		const res = await request(application.app).patch('/users/user/update').send({
			city: 'Москва',
		});
		expect(res.statusCode).toBe(400);
	});
	it('User-update-error: City is required', async () => {
		const res = await request(application.app).patch('/users/user/update').send({
			dasda: 'Москва',
		});
		expect(res.statusCode).toBe(400);
	});
});
afterAll(() => {
	application.close();
});
