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
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '0', // Invalid category id to be replaced with the id of the first category when it becomes available
      },
      { path: ':categoryId', component: InventoryPage },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
