import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from './catalog-page/catalog.page';
import { RootPage } from './root-page/root.page';

const routes: Routes = [
  {
    path: 'customer',
    component: RootPage,
    children: [
      { path: 'category/:categoryId', component: CatalogPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
