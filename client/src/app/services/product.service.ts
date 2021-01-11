import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../product';
import { IProductCategory } from '../product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public readonly currentProduct$ = new Subject<IProduct>();

  constructor(
    private http: HttpClient,
  ) { }

  setCurrentProduct(product: IProduct): void {
    this.currentProduct$.next(product);
  }

  getAllCategoriesRx(): Observable<Array<IProductCategory>> {
    return this.http.get<Array<IProductCategory>>('/api/category/all');
  }

  getAllProductsInCategoryRx(categoryId: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`/api/category/${categoryId}/product/all`);
  }
}
