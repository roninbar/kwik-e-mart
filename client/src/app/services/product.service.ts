import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/product.interface';
import { IProductCategory } from '../types/product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public currentProduct: IProduct | null = null;

  constructor(
    private http: HttpClient,
  ) { }

  setCurrentProduct(product: IProduct | null): void {
    this.currentProduct = product;
  }

  saveProductRx(categoryId: string, product: IProduct, imageFile: File): Observable<IProduct> {
    const body = new FormData();
    body.append('categoryId', product.categoryId);
    body.append('name', product.name);
    body.append('price', product.price.toFixed(2));
    body.append('image', imageFile);
    if (typeof product._id === 'string') {
      return this.http.put<IProduct>(`/api/category/${categoryId}/product/${product._id}`, body);
    }
    else {
      return this.http.post<IProduct>(`/api/category/${product.categoryId}/product`, body);
    }
  }

  getAllCategoriesRx(): Observable<Array<IProductCategory>> {
    return this.http.get<Array<IProductCategory>>('/api/category/all');
  }

  getAllProductsInCategoryRx(categoryId: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`/api/category/${categoryId}/product/all`);
  }
}
