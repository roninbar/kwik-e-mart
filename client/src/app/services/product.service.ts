import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/product.interface';
import { IProductCategory } from '../types/product-category.interface';
import { AlertService, httpAlert } from './alert.service';

class ProductEncoder implements HttpParameterCodec {

  encodeKey(key: string): string {
    return key;
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return key;
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }

}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  saveProductRx(product: IProduct): Observable<IProduct> {
    const body = new HttpParams({
      fromObject: {
        name: product.name,
        price: product.price.toFixed(2),
        imageUrl: product.imageUrl,
      },
      encoder: new ProductEncoder(),
    });
    return (product._id
      ? this.http.put<IProduct>(`/api/category/${product.categoryId}/product/${product._id}`, body)
      : this.http.post<IProduct>(`/api/category/${product.categoryId}/product`, body))
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
