import request from 'supertest';
import { App } from '../src/app/app';
import { boot } from '../src/app/main';
import { admin_token, supplier_token } from './auth.e2e-spec';

export let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Promotions e2e', () => {
	it('Promotion-create-error: Promotion data invalid', async () => {
		const res = await request(application.app)
			.post('/promotions/promotion/create')
			.set('Authorization', `Bearer ${supplier_token}`)
			.send({
				title: 'Распродажа зимней шапки',
				description: 'Купите две пары зимних шапок по цене одной',
				startDate: '2024-11-26',
				endDate: '2024-12-26',
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
				city: 'Нижний Новгород',
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

afterAll(() => {
	application.close();
});
