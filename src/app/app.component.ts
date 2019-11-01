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
              Lista de Usuarios
            </a>
          </li>
          <li class="nav-item">
            <a
              routerLink="add"
              class="btn"
              role="button"
              routerLinkActive="active"
            >
              Añadir nuevo usuario
            </a>
          </li>
          <li class="nav-item">
            <a
              routerLink="update"
              class="btn"
              role="button"
              routerLinkActive="active"
            >
              Actualizar información de usuario
            </a>
          </li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
      <app-messages></app-messages>
    </div>
    `,
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Crud exercise in Angular';
}
