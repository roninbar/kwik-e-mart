import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './sign-in-page/sign-in.page';
import { SignUpPage } from './sign-up-page/sign-up.page';
import { WelcomePage } from './welcome/welcome.page';

@NgModule({
  declarations: [
    WelcomePage,
    SignInPage,
    SignUpPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatStepperModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
