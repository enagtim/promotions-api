import request from 'supertest';
import { App } from '../src/app/app';
import { boot } from '../src/app/main';
export let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});
export let admin_token: string;
export let supplier_token: string;
describe('Register e2e', () => {
	it('Register-error: Invalid admin data. email, password, name, role are required', async () => {
		const res = await request(application.app).post('/auth/register').send({
			email: 'enagtim@mail.ru',
			role: 'ADMIN',
		});
		expect(res.statusCode).toBe(400);
	});
	it('Register-error: admin is existed', async () => {
		const res = await request(application.app).post('/auth/register').send({
			email: 'enagtim@mail.ru',
			password: '1234',
			name: 'Nikita',
			role: 'ADMIN',
		});
		expect(res.statusCode).toBe(400);
	});
	it('Register-error: only admin can register', async () => {
		const res = await request(application.app).post('/auth/register').send({
			email: 'enagtim@mail.ru',
			password: '1234',
			name: 'Nikita',
			role: 'SUPPLIER',
		});
		expect(res.statusCode).toBe(400);
	});
});
describe('Login e2e', () => {
	it('Login-token: access_token_admin', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: 'enagtim@mail.ru',
			password: '1234',
		});
		admin_token = res.body.access_token;
		expect(admin_token).toBeDefined();
		expect(res.statusCode).toBe(200);
	});
	it('Login-token: access_token_supplier', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: 'anna@gmail.com',
			password: '123',
		});
		supplier_token = res.body.access_token;
		expect(supplier_token).toBeDefined();
		expect(res.statusCode).toBe(200);
	});
	it('Login-error: email, password are required', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: '',
		});
		expect(res.statusCode).toBe(400);
	});
	it('Login-error: email or password not valid', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: 'esdsdsd',
			password: 'sdsdsdssd',
		});
		expect(res.statusCode).toBe(404);
	});
});
describe('Role e2e', () => {
	it('Role-create-error: Invalid data Supplier', async () => {
		const res = await request(application.app)
			.post('/roles/role/create')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				role: 'SUPPLIER',
			});
		expect(res.statusCode).toBe(400);
	});
	it('Role-create-error: Role is existed', async () => {
		const res = await request(application.app)
			.post('/roles/role/create')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				email: 'anna@gmail.com',
				password: '123',
				name: 'Anna',
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
describe('Promotions e2e', () => {
	it('Promotion-create-error: Promotion data invalid', async () => {
		const res = await request(application.app)
			.post('/promotions/promotion/create')
			.set('Authorization', `Bearer ${supplier_token}`)
			.send({
				title: 'Распродажа зимней шапки',
				tagIds: [2],
			});
		expect(res.statusCode).toBe(400);
	});
	it('Promotion-get-supplier-error: Supplier id is required', async () => {
		const res = await request(application.app)
			.get('/promotions/promotion/supplier')
			.set('Authorization', `Bearer ${supplier_token}`);
		expect(res.statusCode).toBe(400);
	});
	it('Promotion-get-city-tag-error: Promotion data invalid', async () => {
		const res = await request(application.app)
			.get('/promotions/all/city/tag')
			.set('Authorization', `Bearer ${supplier_token}`)
			.send({
				citsasy: 'Нижний Новгород',
			});
		expect(res.statusCode).toBe(400);
	});
	it('Promotion-update-error: Promotion id is required', async () => {
		const res = await request(application.app)
			.patch('/promotions/promotion/update')
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				status: 'REJECT',
			});
		expect(res.statusCode).toBe(400);
	});
	it('Promotion-update-error: Promotion is not found', async () => {
		const res = await request(application.app)
			.patch('/promotions/promotion/update')
			.query({ id: '100' })
			.set('Authorization', `Bearer ${admin_token}`)
			.send({
				status: 'REJECT',
			});
		expect(res.statusCode).toBe(404);
	});
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
		expect(res.statusCode).toBe(404);
	});
});
afterAll(() => {
	application.close();
});
