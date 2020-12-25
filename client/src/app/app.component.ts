import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'Kwik-E-Mart';

  constructor(
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.alertService.alert.subscribe((message) => this.openSnackBar(message));
  }

  async goToHomePage(): Promise<boolean> {
    return await this.router.navigateByUrl('/');
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss');
  }
}
