import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email: string;
  password: string;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit(): void {
    this.authService.logInRx(this.email, this.password)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.alertService.postAlert(error.statusText);
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError('Danger');
      }))
      .subscribe(async () => await this.router.navigateByUrl('/category/all'));
  }

}
