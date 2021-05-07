import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IOrder } from '../types/order.interface';

const LASTORDER = 'lastOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public constructor(private http: HttpClient) { }

  public placeOrderRx(fields: { [key: string]: string }): Observable<IOrder> {
    return this.http
      .post<IOrder>('/api/order', new HttpParams({ fromObject: fields }))
      .pipe(tap(order => this.setLastOrder(order)));
  }

  public getAllOrdersRx(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>('/api/order/all');
  }

  public getLastOrder(): IOrder {
    return JSON.parse(localStorage.getItem(LASTORDER) || 'null');
  }

  private setLastOrder(order: IOrder): void {
    localStorage.setItem(LASTORDER, JSON.stringify(order));
  }
}
