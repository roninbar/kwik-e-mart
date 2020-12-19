import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  constructor(public cartService: CartService) { }

  placeOrder(f: NgForm): void {
    console.log(f.value);
  }

}
