import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'kwik-e-mart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Kwik-E-Mart';

  public constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    document.title = this.title;
    this.alertService.alert.subscribe((message: string) => this.openSnackBar(message));
    this.authService.loggedInUserChange$.subscribe(() => this.router.navigateByUrl('/'));
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 4000 });
  }

}
