import * as Backbone from 'backbone';

import TrackModel from './track.model';

describe('TrackModel', () => {

  let model;

  beforeEach(() => {
    model = new TrackModel({
      trackId: '1234',
      trackName: 'Test my app baby',
      currency: 'USD',
      artistName: 'Anthony balavoine',
      trackPrice: 0.99
    });
  });

  it('should be created', () => {
    expect(model).toBeDefined();
  });

  it('should have track id', () => {
    expect(model.get('id')).toEqual('1234');
  });

  it('should have title name', () => {
    expect(model.get('title')).toEqual('Test my app baby');
  });

  it('should have artist name', () => {
    expect(model.get('artistName')).toEqual('Anthony balavoine');
  });

  it('should have formated price', () => {
    expect(model.get('formatedPrice')).toEqual('$0.99');
  });
});
