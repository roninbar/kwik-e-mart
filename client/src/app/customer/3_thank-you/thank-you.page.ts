import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class ThankYouPage {

  public readonly lastOrder = this.orderService.getLastOrder();

  constructor(
    private orderService: OrderService,
  ) { }

}
