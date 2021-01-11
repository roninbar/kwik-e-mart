import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin-page/admin.page';
import { InventoryPage } from './inventory-page/inventory.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminPage,
    InventoryPage,
  ],
})
export class AdminModule { }
