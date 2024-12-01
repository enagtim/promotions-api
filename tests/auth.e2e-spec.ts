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
	it('Register-error: admin is existed', async () => {
		const res = await request(application.app).post('/auth/register').send({
			email: 'enagtim@mail.ru',
			password: '1234',
			name: 'Nikita',
			role: 'ADMIN',
		});
		expect(res.statusCode).toBe(404);
	});
	it('Register-error: only admin can register', async () => {
		const res = await request(application.app).post('/auth/register').send({
			email: 'enagtim@mail.ru',
			password: '1234',
			name: 'Nikita',
			role: 'SUPPLIER',
		});
		expect(res.statusCode).toBe(404);
	});
});
describe('Login e2e', () => {
	it('Login-token: access_token_admin', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: 'enagtim@mail.ru',
			password: '1234',
		});
		admin_token = res.body.access_token;
		expect(res.statusCode).toBe(200);
		expect(admin_token).toBeDefined();
	});
	it('Login-token: access_token_supplier', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: 'tom@gmail.com',
			password: '123',
		});
		supplier_token = res.body.access_token;
		expect(res.statusCode).toBe(200);
		expect(supplier_token).toBeDefined();
	});
	it('Login-error: email, password are required', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: '',
			password: '',
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
	it('Login-error: password not valid', async () => {
		const res = await request(application.app).post('/auth/login').send({
			email: 'enagtim@mail.ru',
			password: 'sdsdsdssd',
		});
		expect(res.statusCode).toBe(404);
	});
});
afterAll(() => {
	application.close();
});
