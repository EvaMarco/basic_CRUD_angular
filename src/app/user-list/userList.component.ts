import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "../api.service";
import { User } from "./user";

@Component({
  selector: 'app-main',
  template: `
    <div class="users__wrapper">
      <h2 class="user-list__title">
        Users List
      </h2>
      <div class="user-list__wrapper">
        <ul class="user__list">
          <li
            class= "user-item__title"
          >
            <p class="user-name__title">
              Name
            </p>
            <p class="item user-id__title">
              Id
            </p>
            <p class="item more-link__title">
              More info
            </p>
            <p class="item edit-link__title">
              Edit
            </p>
            <p class="item delete-btn__title">
              Delete
            </p>
          </li>
          <li
            *ngFor="let user of users | async"
            class= "item user__item"
            [class.selected]= "user === selectedUser"
            (click)="getUserById(user)"
          >
            <p class="user__name">
              {{user.name}}
            </p>
            <p class="item user__id">
              {{user.id}}
            </p>
            <a
              routerLink="/detail/{{user.id}}"
              class = "item btn detail__link"
            >
              More
            </a>
            <a
              routerLink="/update/{{user.id}}"
              class = "item btn update__link"
            >
              Edit
            </a>
            <button
              class="item btn delete__btn"
              (click)='deleteUser(user.id)'
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./user-list.component.sass']
})

export class UserList implements OnInit {

  users: Observable<User[]>;
  selectedUser: User;

  constructor(
    private apiService: ApiService
  ){ }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.apiService.getUserList();
  }

  getUserById(user: User){
    this.selectedUser = user;
    this.apiService.getUserById(user.id);
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id)
      .subscribe(
        () =>{
        this.ngOnInit();
      }),
      err => {
        console.log("Error");
      };
  }
}
