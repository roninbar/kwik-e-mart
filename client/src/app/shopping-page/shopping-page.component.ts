import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of as observableOf } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderItem } from '../order-item';
import { IProduct } from '../product';
import { IProductCategory } from '../product-category';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {

  public readonly allCategories$: Observable<Array<IProductCategory>> = this.productService.getAllCategoriesRx();

  private readonly categoryName$: Observable<string> = combineLatest([this.allCategories$, this.route.paramMap]).pipe(
    map(([categories, paramMap]) => {
      const { name } = categories.find(({ _id }) => _id === paramMap.get('categoryId'));
      return name;
    }),
  );

  public readonly allProductsInCategory$: Observable<Array<IProduct>> = this.route.paramMap.pipe(
    switchMap(paramMap => this.productService.getAllProductsInCategoryRx(paramMap.get('categoryId'))),
  );

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private toolbarService: ToolbarService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryName$.subscribe({ next: categoryName => this.toolbarService.categoryName$.next(categoryName) });
  }

  setCartItem(product: IProduct, quantity: number = 1): void {
    this.cartService.setItem(product, quantity);
  }

  checkOutAsync(): Promise<boolean> {
    return this.router.navigateByUrl('/checkout');
  }

  logOut(): void {
    this.authService.logOutRx().subscribe();
  }

  productIdOfProduct(index: number, product: IProduct): string {
    return product._id;
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }

}
