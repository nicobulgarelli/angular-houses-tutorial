import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Housing} from "../housing";

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <article>
      <section class="Register">
        <h2 class="section-heading">Register</h2>
        <form [formGroup]="registrationForm" (submit)="submitRegistrationRequest()">
          <label for="username">Username: </label>
          <input id="username" type="text" formControlName="username" />
          <br />
          <label for="password">Password: </label>
          <input id="password" type="password" formControlName="password" />
          <br />
          @if (isDuplicate) {
            <p>Questo username è già stato registrato.</p>
          }
          <br />
          <button type="submit" class="primary">Submit</button>
        </form>
      </section>
    </article>
  `,
  styles: `p {     color: red;   }`,
})
export class Register {
  isDuplicate: boolean = false;
  housingService = inject(Housing);

  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  async submitRegistrationRequest() {
    this.isDuplicate = await this.housingService.registerUser(
        this.registrationForm.value.username ?? '',
        this.registrationForm.value.password ?? '',
    );
  }
}
