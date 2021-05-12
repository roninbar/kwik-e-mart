import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CitiesService } from 'src/app/services/cities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'kwik-e-mart-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class SignUpPage implements OnInit {

  public readonly form = new FormGroup({
    _id: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+$/)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.pattern(/^[^\s]+$/)]),
    city: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required, Validators.pattern(/^(\d+\s+\w+)|(\w+\s+\d+)$/)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  }, {
    validators: form => {
      const errors = form.get('password')?.value === form.get('passwordRepeat')?.value ? null : {};
      form.get('passwordRepeat')?.setErrors(errors);
      return null;
    },
  });

  public readonly cities = this.citiesService.cities;

  constructor(
    private citiesService: CitiesService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    // tslint:disable-next-line: deprecation
    this.userService.createRx(this.form.value).subscribe(async () => {
      this.alertService.postAlert(`Congratulations, ${this.form.value.firstName}! You are now a member of Kwik-E-Mart! Please log in using your e-mail and password.`);
      return await this.router.navigate(['../signin']);
    });
  }

}
