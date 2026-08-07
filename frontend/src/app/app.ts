import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
        <header class="brand-name">
          <a [routerLink]="['/']">
            <img class="brand-logo" src="/public/logo.svg" alt="logo" aria-hidden="true"/>
          </a>
          <button [routerLink]="['/login']" class="primary">Login</button>
        </header>
      <section class="content">
        <router-outlet/>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'default';
}

