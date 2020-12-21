import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderItem } from '../order-item';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
  ) { }

  placeOrder(f: NgForm): void {
    this.orderService.placeOrderRx(f.value).subscribe(console.log);
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }
}
