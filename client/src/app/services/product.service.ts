import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/product.interface';
import { IProductCategory } from '../types/product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  saveProductRx(product: IProduct, imageFile?: File): Observable<IProduct> {
    const body = new FormData();
    body.append('_id', product._id);
    body.append('name', product.name);
    body.append('price', product.price.toFixed(2));
    if (imageFile) {
      body.append('image', imageFile);
    }
    return product._id
      ? this.http.put<IProduct>(`/api/category/${product.categoryId}/product/${product._id}`, body)
      : this.http.post<IProduct>(`/api/category/${product.categoryId}/product`, body);
  }

  getAllCategoriesRx(): Observable<Array<IProductCategory>> {
    return this.http.get<Array<IProductCategory>>('/api/category/all');
  }

  getAllProductsInCategoryRx(categoryId: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`/api/category/${categoryId}/product/all`);
  }

}
