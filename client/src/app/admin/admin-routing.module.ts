import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin-page/admin.page';
import { InventoryPage } from './inventory-page/inventory.page';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [RoleGuard],
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
