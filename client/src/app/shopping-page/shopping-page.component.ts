import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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

  allCategories$: Observable<Array<ProductCategory>> = this.productService.getAllCategoriesAsync();

  allProductsInCategory$: Observable<Array<Product>> = this.productService.getAllProductsInCategoryAsync(this.getCategoryId());

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
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

  checkOutAsync(f): Promise<boolean> {
    return this.router.navigateByUrl('/order');
  }

  logOut(): void {
    this.authService.logOutAsync().subscribe();
  }

  productIdOfProduct(index: number, product: Product): string {
    return product._id;
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }

  private setProductCategory(categoryId): void {
    this.allProductsInCategory$ = this.productService.getAllProductsInCategoryAsync(categoryId);
  }

  private getCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId');
  }

}
