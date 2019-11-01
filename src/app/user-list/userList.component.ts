import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "../api.service";
import { User } from "./user";

@Component({
  selector: 'app-main',
  template: `
      <h1 class="main-comp__header">Lista de Usuarios</h1>
      <div class="user__list-wrapper">
        <ul class="user__list">
          <li
            *ngFor="let user of users | async"
            [class.selected]= "user === selectedUser"
          >
            <p class="user__name"> Nombre: {{user.name}} </p>
            <p class="user__name"> Id: {{user.id}} </p>
            <a
              routerLink="/detail/{{user.id}}"
            >
            Modifcar usuario
            </a>
          </li>
        </ul>
      </div>
  `,
  styleUrls: ['./user-list.component.sass']
})
export class UserList implements OnInit {
  users: Observable<User[]>;
  selectedUser: User;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.users = this.apiService.getUserList();
  }
  getUserById(user: User){
    this.selectedUser = user;
    this.apiService.getUserById(user.id)
    .subscribe(
      error => console.log(error)
    );
  }
}

