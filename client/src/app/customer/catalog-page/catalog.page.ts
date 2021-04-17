import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/types/product.interface';

@Component({
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class CatalogPage implements OnInit {

  public readonly allCategories$ = this.productService.getAllCategoriesRx();

  public readonly allProductsInCategory$ = this.route.paramMap.pipe(
    switchMap(paramMap => this.productService.getAllProductsInCategoryRx(paramMap.get('categoryId') || 'all')),
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

}
