import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/product.interface';
import { InventoryPage } from '../inventory-page/inventory.page';

@Component({
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class RootPage implements OnInit {

  public editedProduct: IProduct | null = null;

  public constructor(
    public authService: AuthService,
    public productService: ProductService,
  ) { }

  public ngOnInit(): void {
  }

  public onActivate(page: Component): void {
    if (page instanceof InventoryPage) {
      page.edit.subscribe((product: IProduct) => this.onEdit(product));
    }
    else {
      throw new Error(`Expected argument to be of type InventoryPage but got ${page}.`);
    }
  }

  public onEdit(product: IProduct): void {
    this.editedProduct = product;
  }

  public logOut(): void {
    // tslint:disable-next-line: deprecation
    this.authService.logOutRx().subscribe();
  }

}
