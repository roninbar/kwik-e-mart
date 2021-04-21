import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class SignUpPage implements OnInit {

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public submit(f: NgForm): void {
    // tslint:disable-next-line: deprecation
    this.userService.createRx(f.value).subscribe(async () => {
      this.alertService.postAlert(`Congratulations, ${f.value.firstName}! You are now a member of Kwik-E-Mart! Please log in using your e-mail and password.`);
      return await this.router.navigateByUrl('/login');
    });
  }

}
