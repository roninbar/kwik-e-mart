import { EventEmitter, Injectable } from '@angular/core';
import { ICartItemsMap } from '../types/cart-items-map.interface';
import { OrderItem } from '../types/order-item';
import { IProduct } from '../types/product.interface';

const CARTITEMS = 'cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public readonly change = new EventEmitter();

  constructor() {
    this.validateStoredCart();
  }

  getItem(productId: string): OrderItem | null {
    const map = this.getCartItemsMap();
    return map[productId] || null;
  }

  getAllItems(): Array<OrderItem> {
    return Object.values(this.getCartItemsMap());
  }

  getTotalQuantity(): number {
    return this.getTotal(item => item.quantity);
  }

  getTotalPrice(): number {
    return this.getTotal(item => item.quantity * item.purchasePrice);
  }

  setItem(product: IProduct, quantity: number): void {
    const map = this.getCartItemsMap();
    if (quantity > 0) {
      map[product._id] = new OrderItem(product, quantity, product.price);
    }
    else {
      delete map[product._id];
    }
    this.setCartItemsMap(map);
  }

  empty(): void {
    this.setCartItemsMap({});
  }

  isEmpty(): boolean {
    return this.getTotal(item => 1) === 0;
  }

  private getTotal(selectTerm: (item: OrderItem) => number): number {
    return Object.values(this.getCartItemsMap())
      .map(selectTerm)
      .reduce((total, term) => total + term, 0);
  }

  private getCartItemsMap(): ICartItemsMap {
    return JSON.parse(localStorage.getItem(CARTITEMS) || '{}');
  }

  private setCartItemsMap(map: ICartItemsMap): void {
    localStorage.setItem(CARTITEMS, JSON.stringify(map));
    this.change.emit();
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
