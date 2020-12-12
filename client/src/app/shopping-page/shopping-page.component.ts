import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import debug from 'debug';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Product } from '../product';
import { ProductCategory } from '../product-category';
import { ProductService } from '../product.service';

const log = debug('client:shopping-page');

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {

  allCategories$: Observable<Array<ProductCategory>> = this.productService.getAllCategories();

  allProductsInCategory$: Observable<Array<Product>> = this.productService.getAllProductsInCategory(this.getCategoryId());

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe((event) => {
      log(event);
      if (event instanceof ActivationEnd) {
        const categoryId = event.snapshot.paramMap.get('categoryId');
        this.setProductCategory(categoryId);
      }
    });
  }

  ngOnInit(): void {
    this.allCategories$ = this.productService.getAllCategories();
  }

  private setProductCategory(categoryId): void {
    this.allProductsInCategory$ = this.productService.getAllProductsInCategory(categoryId);
  }

  private getCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId');
  }

}
