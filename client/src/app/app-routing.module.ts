import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { NotFoundPage } from './page-not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthorizationGuard],
    children: [],
  },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true }, // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
