import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthorizationGuard],
    children: [],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true }, // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
