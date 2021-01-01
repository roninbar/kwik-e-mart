import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItem } from '../order-item';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {

  constructor(
    private router: Router,
    public cartService: CartService,
    private orderService: OrderService,
  ) { }

  placeOrder(f: NgForm): void {
    this.orderService.placeOrderRx(f.value).subscribe(async () => {
      this.cartService.emptyCart();
      await this.router.navigateByUrl('/thankyou');
    });
  }

  getCartTotal(): string {
    return this.cartService
      .getAllCartItems()
      .reduce((total, { product: { price }, quantity }) => total + quantity * price, 0)
      .toFixed(2);
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }
}
