import { Component, OnInit, Input } from '@angular/core';
import { User } from './../main/user';
import { ApiService } from './../api.service';
import { UserList } from './../main/main.component';
@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <div>
      <h2>Detalle de {{user.name | uppercase }} </h2>
        <label>Name: </label> {{user.name}}
        <input [(ngModel)]="user.name" placehoder = "nombre" />
      </div>
      <div>
        <label>Active: </label> {{user.birthdate}}
        <input [(ngModel)]="user.birthdate" placehoder = "fecha de nacimiento" />
      </div>
      <div>
        <label>Active: </label> {{user.id}}
      </div>
      <button class="delete__btn" (click)='deleteUser()'>Delete</button>
      <button class="delete__btn" (click)='updateUser()'>Update</button>
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

