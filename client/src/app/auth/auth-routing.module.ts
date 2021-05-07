import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SignInPage } from './sign-in-page/sign-in.page';
import { SignUpPage } from './sign-up-page/sign-up.page';
import { WelcomePage } from './welcome/welcome.page';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    component: WelcomePage,
    children: [
      {
        path: 'signup',
        component: SignUpPage,
      },
      {
        path: 'signin',
        component: SignInPage,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
