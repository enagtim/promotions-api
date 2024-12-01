import request from 'supertest';
import { App } from '../src/app/app';
import { boot } from '../src/app/main';
import { admin_token } from './auth.e2e-spec';

export let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});
describe('Role e2e', () => {
	it('Role-create-error: Invalid data Supplier', async () => {
		const res = await request(application.app)
			.post('/roles/role/create')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				email: 'Lol@gmail.com',
				password: '12345',
				role: 'SUPPLIER',
			});
		expect(res.statusCode).toBe(400);
	});
	it('Role-create-error: Role is existed', async () => {
		const res = await request(application.app)
			.post('/roles/role/create')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				email: 'Lol@gmail.com',
				password: '12345',
				name: 'Lol',
				role: 'SUPPLIER',
			});
		expect(res.statusCode).toBe(404);
	});
	it('Role-get-error: ID is required', async () => {
		const res = await request(application.app)
			.get('/roles/role')
			.set('Authorization', `Bearer ${admin_token}`);
		expect(res.statusCode).toBe(400);
	});
	it('Role-get-error: Role not found', async () => {
		const res = await request(application.app)
			.get('/roles/role')
			.query({ id: '80' })
			.set('Authorization', `Bearer ${admin_token}`);
		expect(res.statusCode).toBe(404);
	});
	it('Role-update-error: ID is required', async () => {
		const res = await request(application.app)
			.patch('/roles/role/update')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				name: 'Tomas',
			});
		expect(res.statusCode).toBe(400);
	});
	it('Role-update-error: Role not found', async () => {
		const res = await request(application.app)
			.patch('/roles/role/update')
			.query({ id: '80' })
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				name: 'Tomas',
			});
		expect(res.statusCode).toBe(404);
	});
	it('Role-remove-error: ID is required', async () => {
		const res = await request(application.app)
			.delete('/roles/role/remove')
			.set('Authorization', `Bearer ${admin_token}`);
		expect(res.statusCode).toBe(400);
	});
	it('Role-remove-error: Role not found', async () => {
		const res = await request(application.app)
			.delete('/roles/role/remove')
			.query({ id: '80' })
			.set('Authorization', `Bearer ${admin_token}`);
		expect(res.statusCode).toBe(404);
	});
});
afterAll(() => {
	application.close();
});
