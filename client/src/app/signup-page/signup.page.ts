import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class SignupPage {

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
  ) { }

  public submit(f: NgForm): void {
    this.userService.createRx(f.value).subscribe(async () => {
      this.alertService.postAlert(`Congratulations, ${f.value.firstName}! You are now a member of Kwik-E-Mart! Please log in using your e-mail and password.`);
      return await this.router.navigateByUrl('/login');
    });
  }

}
