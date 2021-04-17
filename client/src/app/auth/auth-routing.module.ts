import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './sign-in-page/sign-in.page';
import { SignUpPage } from './sign-up-page/sign-up.page';

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpPage,
  },
  {
    path: 'signin',
    component: SignInPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
