import request from 'supertest';
import { App } from '../src/app/app';
import { boot } from '../src/app/main';

export let application: App;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});
describe('Notifications e2e', () => {
	it('Notification-create-error: Promotion id and userIds is required', async () => {
		const res = await request(application.app)
			.post('/notifications/notification/create')
			.send({
				userIds: [1],
			});
		expect(res.statusCode).toBe(400);
	});
	it('Notification-get-error: User id is required', async () => {
		const res = await request(application.app).get('/notifications/all/user');
		expect(res.statusCode).toBe(400);
	});
	it('Notification-remove-error: Notification id is required', async () => {
		const res = await request(application.app).get('/notifications/notification/remove');
		expect(res.statusCode).toBe(400);
	});
});
afterAll(() => {
	application.close();
});
