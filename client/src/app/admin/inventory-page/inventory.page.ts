import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
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
    // Don't show the 'all' category in admin mode because it makes the (+) button ambiguous.
    map(categories => categories.filter(({ _id }) => _id !== 'all')),
    // If :categoryId is not a valid category ID, navigate to the first category.
    tap(categories => (
      categories.map(({ _id }) => _id).includes(this.getCurrentCategoryId()) ||
      this.router.navigate(['..', categories[0]._id], { relativeTo: this.route })
    )),
  );

  public readonly allProductsInCategory$ = this.route.paramMap.pipe(
    switchMap(paramMap => this.productService.getAllProductsInCategoryRx(paramMap.get('categoryId') || 'all')),
  );

  constructor(
    public productService: ProductService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onClickProduct(product: IProduct | null): void {
    this.edit.emit(product || {
      _id: '',
      name: '',
      price: 0,
      imageUrl: '/assets/unknown.webp',
      categoryId: this.getCurrentCategoryId(),
    });
  }

  public getCurrentCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId') || '';
  }
}
