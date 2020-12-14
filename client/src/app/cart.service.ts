import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from './order-item';

const CARTITEMS = 'cartItems';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAllItems(): Array<OrderItem> {
    return Object.entries(this.getCartItems()).map(([productId, amount]) => new OrderItem(productId, 'Product', amount));
  }

  setItem(productId: string, amount: number): void {
    const cartItems = this.getCartItems();
    if (amount > 0) {
      cartItems[productId] = amount;
    }
    else {
      delete cartItems[productId];
    }
    this.setCartItems(cartItems);
  }

  checkOut(): Observable<string> {
    return this.http.post<string>('/api/order', this.getCartItems());
  }

  private getCartItems(): object {
    return JSON.parse(localStorage.getItem(CARTITEMS) || '{}');
  }

  private setCartItems(cartItems: object): void {
    localStorage.setItem(CARTITEMS, JSON.stringify(cartItems));
  }

}
