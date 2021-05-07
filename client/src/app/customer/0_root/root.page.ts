import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/types/order-item';
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

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  public constructor(
    public authService: AuthService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.cartService.change.subscribe(() => this.sidenav.open());
  }

  public ngOnInit(): void {
  }

  public onActivate(page: Page): void {
    this.activePage = page;
  }

  public setFilter(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.router.navigate([], { queryParams: value ? { q: value } : {} });
  }

  public emptyCart(): void {
    if (confirm('Remove all items from the cart?')) {
      this.cartService.empty();
    }
  }

  public goToCheckOutAsync(): Promise<boolean> {
    // TODO: Change URL to a relative route.
    return this.router.navigateByUrl('/customer/checkout');
  }

  public logOut(): void {
    // tslint:disable-next-line: deprecation
    this.authService.logOutRx().subscribe();
  }

  public productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }

}
