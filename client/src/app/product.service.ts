import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductCategory } from './product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategoriesAsync(): Observable<Array<ProductCategory>> {
    return this.http.get<Array<ProductCategory>>('/api/category/all');
  }

  getAllProductsInCategoryAsync(categoryId: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`/api/category/${categoryId}/product/all`);
  }
}
