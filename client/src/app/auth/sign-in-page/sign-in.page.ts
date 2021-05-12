import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'kwik-e-mart-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class SignInPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

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
      // tslint:disable-next-line: deprecation
      .subscribe(async () => await this.router.navigateByUrl('/'));
  }

}
