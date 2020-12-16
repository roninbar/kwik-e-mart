import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemsMap } from './cart-items-map';
import { OrderItem } from './order-item';
import { Product } from './product';

const CARTITEMS = 'cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
    // Validate localStorage.cartItems; delete it if it doesn't conform to the expected structure.
    const mapJson = localStorage.getItem(CARTITEMS);
    // tslint:disable-next-line: label-position
    test: {
      if (typeof mapJson === 'string') {
        const map = JSON.parse(mapJson);
        if (map && typeof map === 'object' && Object.getPrototypeOf(map) === Object.prototype) {
          const items: Array<OrderItem> = Object.values(map);
          try {
            if (items.some(({ product: { _id, name, price, imageUrl }, amount }) => (
              typeof _id !== 'string' ||
              typeof name !== 'string' ||
              typeof price !== 'number' ||
              typeof imageUrl !== 'string' ||
              typeof amount !== 'number'
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

  getAllItems(): Array<OrderItem> {
    return Object.values(this.getCartItemsMap());
  }

  setItem(product: Product, amount: number): void {
    const map = this.getCartItemsMap();
    if (amount > 0) {
      map[product._id] = new OrderItem(product, amount);
    }
    else {
      delete map[product._id];
    }
    this.setCartItemsMap(map);
  }

  checkOut(): Observable<string> {
    return this.http.post<string>('/api/order', this.getCartItemsMap());
  }

  private getCartItemsMap(): CartItemsMap {
    return JSON.parse(localStorage.getItem(CARTITEMS) || '{}');
  }

  private setCartItemsMap(map: CartItemsMap): void {
    localStorage.setItem(CARTITEMS, JSON.stringify(map));
  }

}
