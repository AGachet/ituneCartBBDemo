import * as Backbone from 'backbone';
import TracksView from './tracks.view';

describe('TracksView view', () => {

	let view;

	beforeEach(() => {
		view = new TracksView();
	});

	it('should create', () => {
		expect(view).toBeDefined();
	});

});
