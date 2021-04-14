import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class AdminPage implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

}
