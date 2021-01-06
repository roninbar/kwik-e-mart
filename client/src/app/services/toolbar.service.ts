import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  public readonly allCategories$ = this.productService.getAllCategoriesRx();

  public readonly categoryName$ = new Subject<string>();

  constructor(private productService: ProductService) { }
}
