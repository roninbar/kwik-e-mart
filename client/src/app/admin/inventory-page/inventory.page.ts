import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/product.interface';

@Component({
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class InventoryPage implements OnInit {

  @Output() edit = new EventEmitter<IProduct>();

  public readonly allCategories$ = this.productService.getAllCategoriesRx().pipe(
    map(categories => categories.filter(({ _id }) => _id !== 'all')),
  );

  public readonly allProductsInCategory$ = this.route.paramMap.pipe(
    switchMap(paramMap => this.productService.getAllProductsInCategoryRx(paramMap.get('categoryId') || 'all')),
  );

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onClickProduct(product: IProduct | null): void {
    this.edit.emit(product || {
      _id: '',
      name: '',
      price: 0,
      imageUrl: '/assets/unknown.jpg',
      categoryId: this.getCurrentCategoryId(),
    });
  }

  public getCurrentCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId') || '';
  }
}
