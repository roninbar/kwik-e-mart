import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class AdminPage implements OnInit {

  public readonly allCategories$ = this.productService.getAllCategoriesRx().pipe(
    // Skip the "all" category.
    map(categories => categories.slice(1)),
  );

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  saveProduct({ value: { oldCategoryId, newCategoryId, ...otherFields } }: NgForm): void {
    this.productService.setCurrentProduct(null);
    this.productService.saveProductRx(oldCategoryId, { categoryId: newCategoryId, ...otherFields }).subscribe();
  }

}
