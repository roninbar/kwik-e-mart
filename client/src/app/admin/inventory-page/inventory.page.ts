import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProduct } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class InventoryPage implements OnInit {

  public readonly allProductsInCategory$: Observable<Array<IProduct>> = this.route.paramMap.pipe(
    switchMap(paramMap => this.productService.getAllProductsInCategoryRx(paramMap.get('categoryId'))),
  );

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onClickProduct(product: IProduct): void {
    this.productService.setCurrentProduct(product);
  }

  productIdOfProduct(index: number, product: IProduct): string {
    return product._id;
  }

}
