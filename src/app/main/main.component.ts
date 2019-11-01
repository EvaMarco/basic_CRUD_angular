import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "./../api.service";
import { User } from "./user";

@Component({
  selector: 'app-main',
  template: `
  <div class="main-comp>
      <h1 class="main-comp__header">Users</h1>
    <div class="user__list">
      <ol *ngFor="let user of users | async">
        <li class="user">
          <p>{{user.name}}</p>
          <p>{{user.birthday}}</p>
          <p>{{user.id}}</p>
          <button (click)="deleteUser(user.id)">Delete</button></<button>
        </li>
      </ol>
    </div>
  </div>`,
  styleUrls: ['./main.component.sass']
})
export class UserList implements OnInit {
  employees: Observable<User[]>;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.employees = this.apiService.getUserList();
  }
  deleteUser(id: number) {
    this.apiService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

