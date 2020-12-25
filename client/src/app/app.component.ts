import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public title = 'Kwik-E-Mart';

  public constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.alertService.alert.subscribe((message) => this.openSnackBar(message));
  }

  public async goToHomePage(): Promise<boolean> {
    return await this.router.navigateByUrl('/');
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss');
  }
}
