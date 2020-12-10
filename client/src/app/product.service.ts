import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from './product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(): Observable<Array<ProductCategory>> {
    return this.http.get<Array<ProductCategory>>('/api/category/all');
  }
}
