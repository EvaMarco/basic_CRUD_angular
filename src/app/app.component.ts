import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="header__wrapper">
      <h2 class="header__title">{{title}}</h2>
      <nav class="header__nav">
          <ul class="nav__link-list">
              <li class="nav-item">
                  <a
                    routerLink="users"
                    class="btn"
                    role="button"
                    routerLinkActive="active"
                  >
                    Users List
                  </a>
              </li>
              <li class="nav-item" style="margin-left: 10px;">
                  <a
                    routerLink="add"
                    class="btn"
                    role="button"
                    routerLinkActive="active"
                  >
                    Add new user
                  </a>
              </li>
          </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
`,
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Crud exercise in Angular';
}
