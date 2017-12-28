import TracksView from '../components/tracks/tracks.view';
import { tagName, template } from 'backbone-decorators';
import CartView from '../components/cart/cart.view';
import { IBaseViewOptions } from '../base/base.view';
import * as styles from './cart-page.styles.css';
import PageView from '../page/page.view';
import * as _ from 'underscore';

@tagName('cart-page')
@template(require('./cart-page.template.hbs'))

class CartPageView extends PageView {

  constructor(options: IBaseViewOptions) {
    super(_.extend(options, {
      className: styles.pageContainer,
      events: {
        'keyup .mdl-textfield__input' : _.debounce(function(e) {
          this.getResults(e);
        }, 500)
      }
    }));

    // Tracks component declaration
    this.addSubview(
      new TracksView()
    );
    this.addSubview(
      new CartView()
    );

    const tracksView = this.getSubview('tracks-list');
    this.listenTo(tracksView.collection, 'change', this.updateCart);
    const cartView = this.getSubview('cart');
    this.listenTo(cartView.model, 'change', this.updatelist);
  }

  /**
   * Launch request from tracks list collection
   * @param {Object} event (event meta data)
   */
  getResults(event) {
    const searchedAuthorName: string = String(this.$el.find(event.currentTarget).val());
    const tracksView = this.getSubview('tracks-list');
    const formatedSearch = _.without(searchedAuthorName.split(' '), '').join('+');

    tracksView.collection.fetch({
      data: {
        term: searchedAuthorName,
        media: 'music'
      },
      success: (model, response) => {
        this.renderSubview(tracksView, 'tracks-list');
        this.updateCart();
      }
    });
  }

  /**
   * Updating track list collection
   */
  updatelist() {
    const cartView = this.getSubview('cart');
    const tracksView = this.getSubview('tracks-list');

    tracksView.collection.each(track => {
      const isInCart = track.get('addedToCart');
      const showOnlyInCart = cartView.model.get('showSelectedTracksOnly');

      if(showOnlyInCart && !isInCart) {
        track.set({ display: false });
      }

      if(!showOnlyInCart && !isInCart) {
        track.set({ display: true });
      }

      this.renderSubview(tracksView, 'tracks-list');
    });

  }

  /**
   * Updating the cart model
   */
  updateCart() {
    const cartView = this.getSubview('cart');
    const tracks = this.getSubview('tracks-list').collection;
    const tracksInCart = tracks.where({ addedToCart: true });
    const totalPrice = tracksInCart.reduce((sum, currentModel) => {
      return currentModel.get('price') + sum;
    }, 0);

    cartView.model.set({
      inList: tracks.length,
      inCart: tracksInCart.length,
      totalPrice: this.formatTotalPrice(tracksInCart, totalPrice)
    });

    this.renderSubview(cartView, 'cart');
  }

  /**
   * Format price depending currency and browser locale
   * @param {Array}     modelsInCart (List of tracks in cart)
   * @param {number}    price        (total tracks price)
   */
  formatTotalPrice(modelsInCart, price: number = 0) {
    if (!modelsInCart.length) {
      return;
    }

    const locale = navigator.language;
    const options = {
      style: 'currency',
      currency: modelsInCart[0].get('currency'),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    return new Intl.NumberFormat(locale, options).format(price);
  }
}

export default CartPageView;
