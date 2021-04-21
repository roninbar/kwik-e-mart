import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class RootPage implements OnInit {

  constructor(
    public authService: AuthService,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    // tslint:disable-next-line: deprecation
    this.authService.logOutRx().subscribe();
  }

}
