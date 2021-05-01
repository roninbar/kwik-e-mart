import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootPage } from './0_root/root.page';
import { CatalogPage } from './1_catalog/catalog.page';
import { CheckoutPage } from './2_checkout/checkout.page';
import { ThankYouPage } from './3_thank-you/thank-you.page';
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
        redirectTo: 'catalog/all',
      },
      { path: 'catalog/:categoryId', component: CatalogPage },
      { path: 'checkout', component: CheckoutPage },
      { path: 'thankyou', component: ThankYouPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
