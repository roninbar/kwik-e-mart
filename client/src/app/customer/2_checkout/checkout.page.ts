import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from 'src/app/types/order-item';

@Component({
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class CheckoutPage {

  city = '';
  street = '';
  house = 0;

  constructor(
    private router: Router,
    public cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  autoFill(): void {
    const user = this.authService.getLoggedInUser();
    if (user) {
      ({
        address: { city: this.city, street: this.street, house: this.house }
      } = user);
    }
  }

  placeOrder(f: NgForm): void {
    // tslint:disable-next-line: deprecation
    this.orderService.placeOrderRx(f.value).subscribe(async () => {
      this.cartService.empty();
      await this.router.navigateByUrl('/thankyou');
    });
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }

}
