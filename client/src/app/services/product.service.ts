import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product';
import { IProductCategory } from '../product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public currentProduct: IProduct;

  constructor(
    private http: HttpClient,
  ) { }

  setCurrentProduct(product: IProduct): void {
    this.currentProduct = product;
  }

  saveProductRx(categoryId: string, product: IProduct): Observable<IProduct> {
    const fromObject = { ...product, price: product.price.toFixed(2) };
    if (typeof product._id === 'string') {
      return this.http.put<IProduct>(`/api/category/${categoryId}/product/${product._id}`, new HttpParams({ fromObject }));
    }
    else {
      return this.http.post<IProduct>(`/api/category/${product.categoryId}/product`, new HttpParams({ fromObject }));
    }
  }

  getAllCategoriesRx(): Observable<Array<IProductCategory>> {
    return this.http.get<Array<IProductCategory>>('/api/category/all');
  }

  getAllProductsInCategoryRx(categoryId: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`/api/category/${categoryId}/product/all`);
  }
}
