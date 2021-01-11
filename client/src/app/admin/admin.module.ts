import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminPage } from './admin-page/admin.page';
import { AdminRoutingModule } from './admin-routing.module';
import { InventoryPage } from './inventory-page/inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminPage,
    InventoryPage,
  ],
})
export class AdminModule { }
