import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { OrderItem } from '../order-item';
import { Product } from '../product';
import { ProductCategory } from '../product-category';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent {

  readonly allCategories$: Observable<Array<ProductCategory>> = this.productService.getAllCategoriesRx();

  categoryName$: Observable<string> = this.getCategoryNameRx(this.getCategoryId());

  allProductsInCategory$: Observable<Array<Product>> = this.productService.getAllProductsInCategoryRx(this.getCategoryId());

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

  getAllCartItems(): Array<OrderItem> {
    return this.cartService.getAllItems();
  }

  addToCart(product: Product): void {
    this.cartService.setItem(product, 1);
  }

  setCartItem(product: Product, amount: number): void {
    this.cartService.setItem(product, amount);
  }

  checkOutAsync(f): Promise<boolean> {
    return this.router.navigateByUrl('/order');
  }

  logOut(): void {
    this.authService.logOutRx().subscribe();
  }

  productIdOfProduct(index: number, product: Product): string {
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
