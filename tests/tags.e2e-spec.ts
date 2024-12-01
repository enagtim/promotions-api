import request from 'supertest';
import { App } from '../src/app/app';
import { boot } from '../src/app/main';
import { admin_token } from './auth.e2e-spec';

export let application: App;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});
describe('Tags e2e', () => {
	it('Tags-create-error: Tag name is required', async () => {
		const res = await request(application.app)
			.post('/tags/tag/create')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				names: 'dasas',
			});
		expect(res.statusCode).toBe(400);
	});
	it('Tags-add-user-error: User Id is required', async () => {
		const res = await request(application.app)
			.post('/tags/add/user')
			.send({
				tagIds: [1],
			});
		expect(res.statusCode).toBe(400);
	});
	it('Tags-add-user-error: Tags id is required', async () => {
		const res = await request(application.app)
			.post('/tags/add/user')
			.query({ id: '1' })
			.send({
				tagsasIds: [1],
			});
		expect(res.statusCode).toBe(400);
	});
	it('Tags-get-all-user-error: User id is required', async () => {
		const res = await request(application.app).get('/tags/all/user');
		expect(res.statusCode).toBe(400);
	});
	it('Tags-remove-tags-user-error: User id is required', async () => {
		const res = await request(application.app)
			.delete('/tags/remove/user')
			.send({
				tagIds: [1],
			});
		expect(res.statusCode).toBe(400);
	});
	it('Tags-remove-tags-user-error: Tags body is required', async () => {
		const res = await request(application.app)
			.delete('/tags/remove/user')
			.send({
				tagasaIds: [1],
			});
		expect(res.statusCode).toBe(400);
	});
});
afterAll(() => {
	application.close();
});
