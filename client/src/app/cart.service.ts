import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const CARTITEMS = 'cartItems';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  setItem(productId: string, units: number): void {
    const cartItems = this.getCartItems();
    if (units > 0) {
      cartItems[productId] = units;
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
