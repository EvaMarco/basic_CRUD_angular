import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "./../api.service";
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
            <p class="user__name">Nombre: {{user.name}}</p>
          </li>
        </ul>
      </div>
      <app-user-detail [user]="selectedUser"></app-user-detail>
  `,
  styleUrls: ['./main.component.sass']
})
export class UserList implements OnInit {
  users: Observable<User[]>;
  selectedUser: User;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserList();
  }
  getUserList(): void {
    this.apiService.getUserList()
      .subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.getUserList();
        },
        error => console.log(error));
  }
  updateUser(id: number, data: {}) {
    this.apiService.updateUser(id, data)
      .subscribe(
        data => {
          console.log(data);
          this.getUserList();
        },
        error => console.log(error));
  }
  getUserById(user: User){
    this.selectedUser = user;
    this.apiService.getUserById(user.id)
    .subscribe(
      data => {
        console.log(data);
        this.getUserList();
      },
      error => console.log(error));
  }
}

