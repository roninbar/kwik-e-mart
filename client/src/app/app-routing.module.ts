import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { SignupPage } from './signup-page/signup.page';
import { ThankYouPage } from './thank-you-page/thank-you.page';

const routes: Routes = [
  { path: 'signup', component: SignupPage },
  { path: 'login', component: LoginPageComponent },
  { path: 'category/:categoryId', component: ShoppingPageComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'thankyou', component: ThankYouPage, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/category/all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
