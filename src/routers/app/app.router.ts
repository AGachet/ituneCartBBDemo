import * as Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';

import App from '../../views/app/app.view';

class AppRouter extends Backbone.Router {

	application: App;

	constructor(options: Backbone.RouterOptions = { routes: void 0 }) {
		super(_.defaults(options, {
			routes: {
				'': 'cart'
			}
		}));
	}

	initialize(options: Backbone.RouterOptions): void {
		this.application = new App();
	}

	private cart() {
		this.application.showCartPage();
	}
}

export default AppRouter;
