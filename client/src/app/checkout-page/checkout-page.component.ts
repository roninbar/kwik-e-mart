import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItem } from '../order-item';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {

  city: string;
  street: string;
  house: number;

  constructor(
    private router: Router,
    public cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  autoFill(): void {
    ({
      address: { city: this.city, street: this.street, house: this.house }
    } = this.authService.getLoggedInUser());
  }

  placeOrder(f: NgForm): void {
    this.orderService.placeOrderRx(f.value).subscribe(async () => {
      this.cartService.empty();
      await this.router.navigateByUrl('/thankyou');
    });
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }
}
