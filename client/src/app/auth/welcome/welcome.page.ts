import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

const count = map((array: any[]) => array.length);

@Component({
  selector: 'kwik-e-mart-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.css'],
})
// tslint:disable-next-line: component-class-suffix
export class WelcomePage implements OnInit {

  public readonly nCategories$ = this.productService.getAllCategoriesRx().pipe(count, map(n => n - 1));
  public readonly nProducts$ = this.productService.getAllProductsInCategoryRx('all').pipe(count);
  public readonly nOrders$ = this.orderService.getAllOrdersRx().pipe(count);

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
  }

}
