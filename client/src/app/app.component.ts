import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
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
export class AppComponent implements OnInit {
  public title = 'Kwik-E-Mart';

  public readonly allCategories$: Observable<Array<IProductCategory>> = this.productService.getAllCategoriesRx();

  public readonly categoryName$: Observable<string> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    switchMap(() => this.route.firstChild?.params || of({})),
    map((params: any) => params.categoryId),
    filter((category) => !!category),
    distinctUntilChanged(),
    switchMap((category) => this.getCategoryNameRx(category)),
    shareReplay(1),
  );

  public constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    document.title = this.title;
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
    return this.allCategories$.pipe(
      map(categories => categories.find(category => category._id === categoryId).name),
    );
  }

}
