import * as Backbone from 'backbone';

import App from '../../views/app/app.view';
import AppRouter from './app.router';

describe('Application router', () => {

	let router: AppRouter;
	let cartRouteSpy: jest.SpyInstance<any>;

	beforeAll(() => {
		router = new AppRouter();
		cartRouteSpy = jest.spyOn(router.application, 'showCartPage');

		Backbone.history.start({pushState: true, root: '/'});
	});

	it('should contain reference to main Application view', () => {
		expect(router.application).toBeInstanceOf(App);
	});

	it('should have route config for cart page', () => {
		expect(router.routes['']).toContain('cart');
	});

	it('should show cart page by default', () => {
		expect(cartRouteSpy).toHaveBeenCalled();
	});

});
