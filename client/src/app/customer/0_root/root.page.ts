import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CatalogPage } from '../1_catalog/catalog.page';
import { CheckoutPage } from '../2_checkout/checkout.page';
import { ThankYouPage } from '../3_thank-you/thank-you.page';

type Page = CatalogPage | CheckoutPage | ThankYouPage;

@Component({
  selector: 'kwik-e-mart-customer',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class RootPage implements OnInit {

  private activePage: Page | undefined;

  public constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public onActivate(page: Page): void {
    this.activePage = page;
  }

  public emptyCart(): void {
    if (confirm('Remove all items from the cart?')) {
      this.cartService.empty();
    }
  }

  public goToCheckOutAsync(): Promise<boolean> {
    return this.router.navigate(['..', 'checkout']);
  }

  public logOut(): void {
    // tslint:disable-next-line: deprecation
    this.authService.logOutRx().subscribe();
  }

}
