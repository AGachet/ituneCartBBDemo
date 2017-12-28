import * as Backbone from 'backbone';
import * as _ from 'underscore';

import { IBaseViewOptions } from '../base/base.view';
import CartPageView from '../cart-page/cart-page.view';
import PageView from '../page/page.view';

class App extends Backbone.View<Backbone.Model> {
  page: PageView;

  showCartPage(): void {
    this.remove();

    this.page = new CartPageView({
      container: '#root'
    });

    this.render();
  }

  remove(): Backbone.View<Backbone.Model> {
    if (this.page) {
      this.page.remove();
    }

    return this;
  }

  render(): Backbone.View<Backbone.Model> {
    if (this.page) {
      this.page.render();
    }

    // After render custom lifecycle method
    if (this.page) {
      this.page.afterRender();
    }

    return super.render();
  }
}

export default App;
