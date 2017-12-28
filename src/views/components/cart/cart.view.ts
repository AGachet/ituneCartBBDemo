import CartModel from '../../../models/cart/cart.model';
import { tagName, template } from 'backbone-decorators';
import { BaseView } from '../../base/base.view';
import * as styles from './cart.styles.css';
import * as Backbone from 'backbone';
import * as _ from 'underscore';

@tagName('cart')
@template(require('./cart.template.hbs'))

class CartView extends BaseView {
  constructor() {
    super();
    // Add Model
    this.model = new CartModel();
    // Add generated class
    this.$el.addClass(styles.cart);
    // Backbone events
    this.events = () => {
      return {
        'click .mdl-button' : 'showAndBuyTracks'
      };
    };
  }

  /**
   * [showAndBuyTracks description]
   */
  showAndBuyTracks() {
    const showSelectedTracksOnly = this.model.get('showSelectedTracksOnly');
    const buyTracksConfirmed = this.model.get('buyTracksConfirmed');

    if (!showSelectedTracksOnly) {
      this.model.set({ showSelectedTracksOnly: true });
      this.render();

      return;
    }

    this.model.set({ showSelectedTracksOnly: false });
    this.render();
  }


}

export default CartView;
