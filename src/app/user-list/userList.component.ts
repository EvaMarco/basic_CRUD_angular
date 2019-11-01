import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "../api.service";
import { User } from "./user";

@Component({
  selector: 'app-main',
  template: `
    <div class="users__wrapper">
      <h2 class="user-list__title">Users List</h2>
      <div class="user-list__wrapper">
        <ul class="user__list">
          <li
          class= "user-item__title"
        >
          <p class="user-name__title"> Name: </p>
          <p class="user-id__title"> Id: </p>
          <p class="user-link__title"> Link: </p>
          <p class="user-link__title"> More</p>
        </li>
          <li
            *ngFor="let user of users | async"
            class= "user__item"
            [class.selected]= "user === selectedUser"
            (click)="getUserById(user)"
          >
            <p class="user__name">{{user.name}} </p>
            <p class="user__id"> {{user.id}} </p>
            <a
              routerLink="/detail/{{user.id}}"
              class = "user__link"
            >
            More
            </a>
          </li>
        </ul>
      </div>
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
  }
}

