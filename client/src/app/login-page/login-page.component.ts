import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private auth: AuthService,
  ) { }

  onSubmit(): void {
    this.auth.logIn(this.username, this.password).subscribe();
  }

  ngOnInit(): void {
  }

}
