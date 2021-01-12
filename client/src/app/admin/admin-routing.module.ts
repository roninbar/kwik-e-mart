import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin-page/admin.page';
import { AdminGuard } from './admin.guard';
import { InventoryPage } from './inventory-page/inventory.page';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [AdminGuard],
    children: [
      { path: 'category/:categoryId', component: InventoryPage },
      { path: '', redirectTo: 'category/all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
