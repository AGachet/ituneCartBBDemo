import ItemsCollection from '../../../collections/items/items.collection';
import { tagName, template } from 'backbone-decorators';
import { BaseView } from '../../base/base.view';
import * as styles from './tracks.styles.css';
import * as Backbone from 'backbone';
import * as _ from 'underscore';

@tagName('tracks-list')
@template(require('./tracks.template.hbs'))

class TracksView extends BaseView {
  constructor() {
    super();
    // Add generated class
    this.$el.addClass(styles.tracksList);
    // Backbone events
    this.events = () => {
      return {
        'click .row' : 'toggleAddedToCart'
      };
    };
    // Set collection resource URL
    this.collection = new ItemsCollection({
      url: 'https://itunes.apple.com/search'
    });
  }

  /**
   * Toggle add to cart checkbox
   * @param {Object} event (Jquery event)
   */
  toggleAddedToCart(event) {
    const element = this.$el.find(event.currentTarget);
    const trackId = element.attr('data-id');
    const model = this.collection.get(trackId);
    const addedToCart = model.get('addedToCart');

    model.set({ 'addedToCart': !addedToCart });
    this.render();
  }
}

export default TracksView;
