import * as Backbone from 'backbone';
import { defaults } from 'backbone-decorators';
import * as _ from 'underscore';

@defaults({
  inCart: 0,
  inList: 0,
  totalPrice: 0,
  showSelectedTracksOnly: false
})

class CartModel extends Backbone.Model {
  constructor() {
    super();
  }
}

export default CartModel;
