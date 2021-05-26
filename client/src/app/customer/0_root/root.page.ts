import {
  BreakpointObserver
} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/types/order-item';

@Component({
  selector: 'kwik-e-mart-customer',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.css'],
})
// tslint:disable-next-line: component-class-suffix
export class RootPage implements OnInit {
  public readonly title = 'Kwik-E-Mart';

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  public constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.cartService.change.subscribe(
      () => this.breakpointObserver.isMatched('(min-width: 600px)') && !this.cartService.isEmpty() && this.sidenav.open()
    );
  }

  public ngOnInit(): void {}

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
    return this.router.navigate(['checkout'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  public logOut(): void {
    // tslint:disable-next-line: deprecation
    this.authService.logOutRx().subscribe();
  }

  public productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }
}
