import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartItemsMap } from '../cart-items-map';
import { OrderItem } from '../order-item';
import { IProduct } from '../product';

const CARTITEMS = 'cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
    this.validateStoredCart();
  }

  getAllCartItems(): Array<OrderItem> {
    return Object.values(this.getCartItemsMap());
  }

  setCartItem(product: IProduct, quantity: number): void {
    const map = this.getCartItemsMap();
    if (quantity > 0) {
      map[product._id] = new OrderItem(product, quantity, product.price);
    }
    else {
      delete map[product._id];
    }
    this.setCartItemsMap(map);
  }

  emptyCart(): void {
    this.setCartItemsMap({});
  }

  private getCartItemsMap(): ICartItemsMap {
    return JSON.parse(localStorage.getItem(CARTITEMS) || '{}');
  }

  private setCartItemsMap(map: ICartItemsMap): void {
    localStorage.setItem(CARTITEMS, JSON.stringify(map));
  }

  /**
   * Validate localStorage.cartItems; delete it if it doesn't conform to the expected structure.
   */
  private validateStoredCart(): void {
    const mapJson = localStorage.getItem(CARTITEMS);
    // tslint:disable-next-line: label-position
    test: {
      if (typeof mapJson === 'string') {
        const map = JSON.parse(mapJson);
        if (map && typeof map === 'object' && Object.getPrototypeOf(map) === Object.prototype) {
          const items: Array<OrderItem> = Object.values(map);
          try {
            if (items.some(({ product: { _id, name, price, imageUrl }, quantity }) => (
              typeof _id !== 'string' ||
              typeof name !== 'string' ||
              typeof price !== 'number' ||
              typeof imageUrl !== 'string' ||
              typeof quantity !== 'number'
            ))) {
              break test;
            }
          }
          catch (err) {
            break test;
          }
        }
        else {
          break test;
        }
      }
      return;
    }
    if (mapJson) {
      localStorage.removeItem(CARTITEMS);
    }
  }

}
