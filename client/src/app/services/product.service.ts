import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/product.interface';
import { IProductCategory } from '../types/product-category.interface';
import { AlertService, httpAlert } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  saveProductRx(product: { [param: string]: string }): Observable<IProduct> {
    return (product._id
      ? this.http.put<IProduct>(`/api/category/${product.categoryId}/product/${product._id}`, new HttpParams({ fromObject: product }))
      : this.http.post<IProduct>(`/api/category/${product.categoryId}/product`, new HttpParams({ fromObject: product })))
      .pipe(httpAlert(this.alertService));
  }

  getAllCategoriesRx(): Observable<Array<IProductCategory>> {
    return this.http.get<Array<IProductCategory>>('/api/category/all')
      .pipe(httpAlert(this.alertService));
  }

  getAllProductsInCategoryRx(categoryId: string, q?: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`/api/category/${categoryId}/product/all` + (q ? `?q=${q}` : ''))
      .pipe(httpAlert(this.alertService));
  }

}
