import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderItem } from './order-item';
import { IProduct } from './product';
import { IProductCategory } from './product-category';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public title = 'Kwik-E-Mart';

  public readonly allCategories$: Observable<Array<IProductCategory>> = this.productService.getAllCategoriesRx();

  public categoryName$: Observable<string> = this.getCategoryNameRx(this.getCategoryId());

  public constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.alertService.alert.subscribe((message) => this.openSnackBar(message));
  }

  public async goToHomePage(): Promise<boolean> {
    return await this.router.navigateByUrl('/');
  }

  public cartIsEmpty(): boolean {
    const cartItems = this.cartService.getAllCartItems();
    return cartItems.length === 0;
  }

  public getAllCartItems(): Array<OrderItem> {
    return this.cartService.getAllCartItems();
  }

  public setCartItem(product: IProduct, quantity: number = 1): void {
    this.cartService.setCartItem(product, quantity);
  }

  public checkOutAsync(f): Promise<boolean> {
    return this.router.navigateByUrl('/checkout');
  }

  public getNumberOfCartItems(): number {
    return this.cartService.getAllCartItems().reduce((a, { quantity: b }) => a + b, 0);
  }

  public productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }

  public logOut(): void {
    this.authService.logOutRx().subscribe();
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss');
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
