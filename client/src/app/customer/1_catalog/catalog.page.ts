import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/product.interface';

const CATEGORYID = 'categoryId';
const Q = 'q';

@Component({
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.css'],
})
// tslint:disable-next-line: component-class-suffix
export class CatalogPage implements OnInit {

  public readonly allCategories$ = this.productService.getAllCategoriesRx();

  public readonly allProductsInCategory$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    switchMap(([paramMap, queryParamMap]) => this.productService.getAllProductsInCategoryRx(
      paramMap.get(CATEGORYID) || 'all',
      queryParamMap.get(Q) || undefined,
    )),
  );

  public constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void { }

  public addCartItem(product: IProduct, delta: number = 1): void {
    const quantity = this.cartService.getItem(product._id)?.quantity || 0;
    this.cartService.setItem(product, quantity + delta);
  }

  public getCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId') || '';
  }

}
