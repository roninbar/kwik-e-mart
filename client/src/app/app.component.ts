import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'kwik-e-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Kwik-E-Mart';

  public constructor(
    private alertService: AlertService,
    private snackBar: MatSnackBar,
  ) {

  }

  public ngOnInit(): void {
    document.title = this.title;
    this.alertService.alert.subscribe((message: string) => this.openSnackBar(message));
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 4000 });
  }

}
