import TrackModel from '../../models/track/track.model';
import { model } from 'backbone-decorators';
import * as Backbone from 'backbone';
import * as _ from 'underscore';

@model(TrackModel)

class ItemsCollection extends Backbone.Collection<TrackModel> {

  constructor(options) {
    super();
    this.url = options.url;
  }

  /**
   * Replace fetched data by modelised one
   * @param {Object} response (request response)
   */
  parse(response) {
    return response.results.map((row) => {
      const tracks = new TrackModel(row);
      tracks.set({
        addedToCart: false,
        display: true
      });

      return tracks;
    });
  }
}

export default ItemsCollection;
