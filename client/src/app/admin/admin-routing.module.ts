import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryPage } from './inventory-page/inventory.page';
import { RoleGuard } from './role.guard';
import { RootPage } from './root-page/root.page';

const routes: Routes = [
  {
    path: 'admin',
    component: RootPage,
    canActivate: [RoleGuard],
    children: [
      { path: 'inventory/:categoryId', component: InventoryPage },
      { path: '', pathMatch: 'full', redirectTo: 'inventory/all' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
