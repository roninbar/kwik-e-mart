import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  username: string;
  password: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  onSubmit(): void {
    this.auth.logInRx(this.username, this.password).subscribe(async () => await this.router.navigateByUrl('/category/all'));
  }

}
