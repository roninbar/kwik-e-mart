import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { RootPage } from './root/root.page';

@NgModule({
  declarations: [RootPage],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
