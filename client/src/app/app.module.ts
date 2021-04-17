import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { NotFoundPage } from './page-not-found/not-found.page';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AuthModule,
    AdminModule,
    CustomerModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    NotFoundPage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
