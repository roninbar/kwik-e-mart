import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CitiesService } from 'src/app/services/cities.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from 'src/app/types/order-item';

const MAX_ORDERS_PER_DAY = 3;

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

  public deliveryDateFilter: DateFilterFn<Moment | null> = (date) => false;

  constructor(
    public cartService: CartService,
    private citiesService: CitiesService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.orderService.getAllOrdersRx().subscribe((orders) => {
      // Count the number of orders on each date.
      const nOrders = orders
        .map(({ delivery: { on } }) => on.split('T')[0])
        .reduce(
          (n: { [d: string]: number }, d) =>
            Object.assign(n, { [d]: (n[d] || 0) + 1 }),
          {}
        );
      this.deliveryDateFilter = (date) =>
        !!date && (nOrders[date.format('yyyy-MM-DD')] || 0) < MAX_ORDERS_PER_DAY;
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
      await this.router.navigate(['../thankyou'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    });
  }

  productIdOfCartItem(index: number, item: OrderItem): string {
    return item.product._id;
  }
}
