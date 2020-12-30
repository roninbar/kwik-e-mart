import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.css']
})
// tslint:disable-next-line: component-class-suffix
export class SignupPage {

  constructor() { }

  public submit(f: NgForm): void {
    console.log(f.value);
  }

}
