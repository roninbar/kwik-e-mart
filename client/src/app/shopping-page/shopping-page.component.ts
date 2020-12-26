import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderItem } from '../order-item';
import { IProduct } from '../product';
import { IProductCategory } from '../product-category';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent {

  public readonly allCategories$: Observable<Array<IProductCategory>> = this.productService.getAllCategoriesRx();

  public categoryName$: Observable<string> = this.getCategoryNameRx(this.getCategoryId());

  public allProductsInCategory$: Observable<Array<IProduct>> = this.productService.getAllProductsInCategoryRx(this.getCategoryId());

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        this.setProductCategory(this.getCategoryId());
      }
    });
  }

  cartIsEmpty(): boolean {
    const cartItems = this.cartService.getAllCartItems();
    return cartItems.length === 0;
  }

  getNumberOfCartItems(): number {
    const cartItems = this.cartService.getAllCartItems();
    return cartItems.reduce((a, { quantity: b }) => a + b, 0);
  }

  getAllCartItems(): Array<OrderItem> {
    return this.cartService.getAllCartItems();
  }

  setCartItem(product: IProduct, quantity: number = 1): void {
    this.cartService.setCartItem(product, quantity);
  }

  checkOutAsync(f): Promise<boolean> {
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

  private setProductCategory(categoryId: string): void {
    this.categoryName$ = this.getCategoryNameRx(categoryId);
    this.allProductsInCategory$ = this.productService.getAllProductsInCategoryRx(categoryId);
  }

  private getCategoryNameRx(categoryId: string): Observable<string> {
    return this.allCategories$.pipe(map(allCategories => {
      const category = allCategories.find(({ _id }) => {
        return _id === categoryId;
      });
      return category.name;
    }));
  }

  private getCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId');
  }

}
