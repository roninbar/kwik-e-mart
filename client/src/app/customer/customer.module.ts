import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogPage } from './catalog/catalog.page';
import { CustomerRoutingModule } from './customer-routing.module';
import { RootPage } from './root/root.page';

@NgModule({
  declarations: [
    CatalogPage,
    RootPage,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
