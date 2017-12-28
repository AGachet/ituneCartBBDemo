import * as Backbone from 'backbone';

import CartModel from './cart.model';

describe('TrackModel', () => {

  let model;

  beforeEach(() => {
    model = new CartModel();
  });

  it('should be created', () => {
    expect(model).toBeDefined();
  });

  it('should have incart initialize to 0', () => {
    expect(model.get('inCart')).toEqual(0);
  });

  it('should have inList initialize to 0', () => {
    expect(model.get('inList')).toEqual(0);
  });

  it('should have total price initialize to 0', () => {
    expect(model.get('totalPrice')).toEqual(0);
  });

  it('should have selected tracks flag set to false', () => {
    expect(model.get('showSelectedTracksOnly')).toBeFalsy();
  });
});
