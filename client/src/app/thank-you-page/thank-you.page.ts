import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderItem } from '../order-item';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class ThankYouPage {

  public lastOrder = this.orderService.getLastOrder();

  constructor(
    public orderService: OrderService,
  ) { }

  public getTotalItems(): number {
    return this.lastOrder.items.reduce((total, { quantity }) => total + quantity, 0);
  }

}
