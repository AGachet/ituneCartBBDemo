import * as Backbone from 'backbone';

import ItemsCollection from './items.collection';

describe('ItemsCollection', () => {

  let collection;

  beforeEach(() => {
    collection = new ItemsCollection({
      url: 'https://itunes.apple.com/search'
    });
  });

  it('should be created', () => {
    expect(collection).toBeDefined();
  });


   it('should have url', () => {
    expect(collection.url).toEqual('https://itunes.apple.com/search');
  });
});
