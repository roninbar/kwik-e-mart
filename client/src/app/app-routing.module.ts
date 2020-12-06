import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'shopping', component: ShoppingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
