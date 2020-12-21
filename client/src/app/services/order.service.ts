import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrderRx(fields: { [key: string]: string }): Observable<string> {
    return this.http.post<string>('/api/order', new HttpParams({ fromObject: fields }));
  }
}
