import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventEmitter } from 'events';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.form.html',
  styleUrls: ['./product.form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line: component-class-suffix
export class ProductForm implements OnInit {

  public readonly allCategories$ = this.productService.getAllCategoriesRx().pipe(
    // Skip the "all" category.
    map(categories => categories.slice(1)),
  );

  // tslint:disable-next-line: no-output-native
  @Output() submit = new EventEmitter();

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  saveProduct({ value: { oldCategoryId, newCategoryId, ...otherFields } }: NgForm, { files }: HTMLInputElement): void {
    this.productService.setCurrentProduct(null);
    this.productService.saveProductRx(oldCategoryId, { categoryId: newCategoryId, ...otherFields }, files[0]).subscribe();
  }

}
