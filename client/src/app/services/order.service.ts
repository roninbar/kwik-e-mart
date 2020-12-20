import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrderRx(fields: { [key: string]: string | number }): Observable<string> {
    const body = Object.entries(fields).reduce(
      (params: HttpParams, [param, value]) => params.append(param, String(value)),
      new HttpParams()
    );
    return this.http.post<string>('/api/order', body);
  }
}
