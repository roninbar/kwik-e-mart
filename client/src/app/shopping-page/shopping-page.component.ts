import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Product } from '../product';
import { ProductCategory } from '../product-category';
import { ProductService } from '../product.service';

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
    private auth: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        const categoryId = event.snapshot.paramMap.get('categoryId');
        this.setProductCategory(categoryId);
      }
    });
  }

  ngOnInit(): void {
    this.allCategories$ = this.productService.getAllCategories();
  }

  logOut(): void {
    this.auth.logOut().subscribe();
  }

  private setProductCategory(categoryId): void {
    this.allProductsInCategory$ = this.productService.getAllProductsInCategory(categoryId);
  }

  private getCategoryId(): string {
    return this.route.snapshot.paramMap.get('categoryId');
  }

}
