import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderItem } from './order-item';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ToolbarService } from './services/toolbar.service';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { SignupPage } from './signup-page/signup.page';
import { ThankYouPage } from './thank-you-page/thank-you.page';

type Page = SignupPage | LoginPageComponent | ShoppingPageComponent | CheckoutPageComponent | ThankYouPage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public title = 'Kwik-E-Mart';

  private activePage: Page;

  public constructor(
    public authService: AuthService,
    public cartService: CartService,
    public toolbarService: ToolbarService,
    private alertService: AlertService,
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

  public onActivate(page: Page): void {
    this.activePage = page;
  }

  public shoppingPageIsActive(): boolean {
    return this.activePage instanceof ShoppingPageComponent;
  }

  public emptyCart(): void {
    if (confirm('Remove all items from the cart?')) {
      this.cartService.empty();
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss');
  }

}
