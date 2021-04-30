import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootPage } from './0_root/root.page';
import { CatalogPage } from './1_catalog/catalog.page';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: 'customer',
    component: RootPage,
    canActivate: [RoleGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all',
      },
      { path: ':categoryId', component: CatalogPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
