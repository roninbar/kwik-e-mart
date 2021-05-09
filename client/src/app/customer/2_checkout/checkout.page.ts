import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CitiesService } from 'src/app/services/cities.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from 'src/app/types/order-item';

@Component({
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.css'],
})
// tslint:disable-next-line: component-class-suffix
export class CheckoutPage {

  house = 0;
  street = '';
  city = '';

  readonly cities = this.citiesService.cities;

  readonly minDeliveryDate = moment().add(1, 'day');

  deliveryDateFilter: DateFilterFn<Moment | null> = (date) => false;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private citiesService: CitiesService,
    private orderService: OrderService,
    private router: Router,
  ) {
    this.orderService.getAllOrdersRx().subscribe((orders) => {
      // Count the number of orders on each date.
      const nOrders = orders
        .map(({ delivery: { on } }) => on)
        .reduce(
          (n: { [d: string]: number }, d) =>
            Object.assign(n, { [d]: (n[d] || 0) + 1 }),
          {}
        );
      this.deliveryDateFilter = (date) =>
        date ? (nOrders[date.toISOString()] || 0) < 3 : false;
    });
  }

  autoFill(): void {
    const user = this.authService.getLoggedInUser();
    if (user) {
      ({
        address: { city: this.city, street: this.street, house: this.house },
      } = user);
    }
  }

  placeOrder(f: NgForm): void {
    // tslint:disable-next-line: deprecation
    this.orderService.placeOrderRx(f.value).subscribe(async () => {
      this.cartService.empty();
      await this.router.navigateByUrl('/customer/thankyou');
    });
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }
}
