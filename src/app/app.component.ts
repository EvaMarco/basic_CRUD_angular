import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="header__wrapper">
      <h1 class="header__title">
        {{title}}
      </h1>
      <nav class="header__nav">
        <ul class="nav__link-list">
          <li class="link-item">
            <a
              routerLink="add"
              class="link btn"
              role="button"
              routerLinkActive="active"
            >
              New User
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <router-outlet></router-outlet>
    <app-messages></app-messages>
    `,
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Crud exercise in Angular';
}
