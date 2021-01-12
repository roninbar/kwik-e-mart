import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotFoundPage } from './page-not-found/not-found.page';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { SignupPage } from './signup-page/signup.page';
import { ThankYouPage } from './thank-you-page/thank-you.page';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: 'signup', component: SignupPage, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'category/:categoryId', component: ShoppingPageComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'thankyou', component: ThankYouPage, canActivate: [AuthGuard, UserGuard] },
  { path: '', redirectTo: '/category/all', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
