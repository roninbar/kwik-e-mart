import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RootPage } from './0_root/root.page';
import { CatalogPage } from './1_catalog/catalog.page';
import { CheckoutPage } from './2_checkout/checkout.page';
import { ThankYouPage } from './3_thank-you/thank-you.page';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatBadgeModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    CustomerRoutingModule,
  ],
  declarations: [
    RootPage,
    CatalogPage,
    CheckoutPage,
    ThankYouPage,
  ],
})
export class CustomerModule { }
