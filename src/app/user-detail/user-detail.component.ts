import { Component, OnInit, Input } from '@angular/core';
import { User } from './../main/user';
import { ApiService } from './../api.service';
import { UserList } from './../main/main.component';
@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <div>
        <label>Name: </label> {{user.name}}
      </div>
      <div>
        <label>Active: </label> {{user.birthday}}
      </div>
      <div>
        <label>Active: </label> {{user.id}}
      </div>
      <button class="delete__btn" (click)='deleteUser()'>Delete</button>
    </div>
  `,
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  constructor(private apiService: ApiService, private listComponent: UserList) { }

  ngOnInit() {
  }

}

