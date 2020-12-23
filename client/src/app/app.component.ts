import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Kwik-E-Mart';

  constructor(private router: Router) { }

  async goToHomePage(): Promise<boolean> {
    return await this.router.navigateByUrl('/');
  }
}
