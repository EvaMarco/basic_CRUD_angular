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
            (click)="getUserById(user)"
          >
            <p class="user__name"> Nombre: {{user.name}} </p>
          </li>
        </ul>
      </div>
      <app-user-detail [user]="selectedUser"></app-user-detail>
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

