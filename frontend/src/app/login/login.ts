import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Housing} from "../housing";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <article>
      <section class="Login">
        <h2 class="section-heading">Login</h2>
        <form [formGroup]="loginForm" (submit)="submitLoginRequest()">
          <label for="username">Username: </label>
          <input id="username" type="text" formControlName="username"/>
          <br/>
          <label for="password">Password: </label>
          <input id="password" type="password" formControlName="password"/>
          <br/>
          <button type="submit" class="primary">Submit</button>
        </form>
        <a [routerLink] = "['/register']">Register</a>
      </section>
    </article>
  `,
  styles: ``,
})
export class Login {
  housingService = inject(Housing);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  submitLoginRequest() {
    this.housingService.loginUser(
        this.loginForm.value.username ?? '',
        this.loginForm.value.password ?? '',
    );
  }
}
