import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './sign-in-page/sign-in.page';
import { SignUpPage } from './sign-up-page/sign-up.page';

@NgModule({
  declarations: [
    SignInPage,
    SignUpPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
