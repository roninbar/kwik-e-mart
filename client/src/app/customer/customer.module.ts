import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CatalogPage } from './catalog/catalog.page';
import { CustomerRoutingModule } from './customer-routing.module';
import { RootPage } from './root/root.page';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
  ],
  declarations: [
    CatalogPage,
    RootPage,
  ],
})
export class CustomerModule { }
