import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { UserList } from '../user-list/userList.component';
@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <div>
      <h2>Detalle de {{user.name | uppercase }} </h2>
        <label>Nombre: </label> {{user.name}}
        <input [(ngModel)]="user.name" placehoder = "nombre" />
      </div>
      <div>
        <label>Fecha de Nacimiento: </label> {{user.birthdate}}
        <input [(ngModel)]="user.birthdate" placehoder = "fecha de nacimiento" />
      </div>
      <div>
        <label>Id del usuario </label> {{user.id}}
      </div>
      <button class="delete__btn" (click)='deleteUser()'>Borar Usuario</button>
      <button class="delete__btn" (click)='updateUser()'>Modificar Usuario</button>
    </div>
  `,
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  constructor(private apiService: ApiService, private listComponent: UserList) { }

  ngOnInit() {
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id)
      .subscribe(
        error => console.log(error));
  }
  updateUser(id: number, data: {}) {
    this.apiService.updateUser(id, data)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }

}

