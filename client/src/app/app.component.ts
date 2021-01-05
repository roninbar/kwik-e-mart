import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { OrderItem } from './order-item';
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
    public cartService: CartService,
    private alertService: AlertService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    document.title = this.title;
    this.alertService.alert.subscribe((message) => this.openSnackBar(message));
  }

  public goToHomePageAsync(): Promise<boolean> {
    return this.router.navigateByUrl('/');
  }

  public goToCheckOutAsync(): Promise<boolean> {
    return this.router.navigateByUrl('/checkout');
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
