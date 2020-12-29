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
export class ThankYouPage implements OnInit {

  public lastOrder = this.orderService.getLastOrder();

  public lastOrderItems$ = this.getLastOrderItemsRx();

  constructor(
    public orderService: OrderService,
    private productService: ProductService,
  ) { }

  public ngOnInit(): void {
  }

  private getLastOrderItemsRx(): Observable<Array<OrderItem>> {
    return this.productService.getAllProductsInCategoryRx('all').pipe(map(
      products =>
        this.orderService
          .getLastOrder()
          .items
          .map(({ product: { _id: productId }, quantity }) => new OrderItem(
            products.find(({ _id }) => _id === productId),
            quantity,
          ))
    ));
  }

}
