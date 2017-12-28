import * as Backbone from 'backbone';
import { defaults } from 'backbone-decorators';
import * as _ from 'underscore';

class TrackModel extends Backbone.Model {

  constructor(data) {
    super();
    this.set({
      id: data.trackId || null,
      title: data.trackName || null,
      currency: data.currency || null,
      artistName: data.artistName || null,
      price: data.trackPrice || null,
      formatedPrice: this.formatPrice(data.currency, data.trackPrice)
    });
  }

  /**
   * Format price depending currency and browser locale
   * @param {string} currency (track price currency)
   * @param {number} price    (track price)
   */
  formatPrice(currency: string, price: number) {
    const locale = navigator.language;
    const options = {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    return new Intl.NumberFormat(locale, options).format(price);
  }

}

export default TrackModel;
