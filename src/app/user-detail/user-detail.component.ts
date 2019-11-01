import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { UserList } from '../user-list/userList.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <div>
      <h2>Detalle de {{user.name | uppercase }} </h2>
      <div>
        <label>Nombre: </label> {{user.name}}
        <input
          [(ngModel)]="user.name"
          placehoder = "nombre"
          #username
          (keyup)= "onKey('name', $event)"
          value="user.name"
        >
      </div>
      <div>
        <label>Fecha de Nacimiento: </label> {{user.birthdate}}
        <input
          [(ngModel)]="user.birthdate"
          placehoder = "fecha de nacimiento"
          (keyup)="onKey('date', $event)"
          value= "user.birthdate"
        >
      </div>
      <div>
        <label>Id del usuario </label> {{user.id}}
      </div>
      <button class="delete__btn" (click)='deleteUser(user.id)'>Borar Usuario</button>
      <button class="update__btn" (click)='updateUser(user.id)'>Modificar Usuario</button>
    </div>
  `,
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  users: Observable<User[]>;
  public newName = '';
  public newDate = '';
  @Input() user: User;
  constructor(
    private apiService: ApiService,
    private listComponent: UserList,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getUserById(id)
      .subscribe();
  }
  reloadData() {
    this.users = this.apiService.getUserList();
  }
  onKey(guilty, event: any) {
    if(guilty == 'name'){
      this.newName = event.target.value;
      console.log('soy el nuevo nombre', this.newName);
      return(this.newName);
    }
    else{
      this.newDate = event.target.value;
      console.log('soy la nueva fecha', this.newDate)
      return(this.newDate);
    }
  }
  deleteUser(id: number) {
    this.apiService.deleteUser(id)
    .subscribe(
      error => console.log(error));
      console.log(id);
      this.reloadData()
    }
  updateUser(id: number) {
    console.log(this.newName)
    console.log(this.newDate)
    console.log(id);
    const user = {
      id: id,
      name: this.newName,
      birthdate: this.newDate
    }

    this.apiService.updateUser(user)
      .subscribe(
        error => console.log(error)
      );
      this.reloadData()
  }

}

