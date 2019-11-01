import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { UserList } from '../user-list/userList.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <div>
      <h2>{{user.name | uppercase }} detail</h2>
      <div>
        <label>Name: </label> {{user.name}}
        <input
          [(ngModel)]="user.name"
          placehoder = "nombre"
          #username
          (keyup)= "onKey('name', $event)"
          value="user.name"
        >
      </div>
      <div>
        <label>BirthDate: </label> {{user.birthdate}}
        <input
          [(ngModel)]="user.birthdate"
          placehoder = "fecha de nacimiento"
          (keyup)="onKey('date', $event)"
          value= "user.birthdate"
        >
      </div>
      <div>
        <label>User ID </label> {{user.id}}
      </div>
      <button class="delete__btn" (click)='deleteUser(user.id)'>Delete</button>
      <button class="update__btn" (click)='updateUser(user.id)'>ModifyUsuario</button>
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
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.apiService.getUserById(id)
      .subscribe();
  }
  reloadData() {
    this.users = this.apiService.getUserList();
  }
  onKey(guilty, event: any) {
    if(guilty == 'name'){
      this.newName = event.target.value;
      return(this.newName);
    }
    else{
      this.newDate = event.target.value;
      return(this.newDate);
    }
  }
  deleteUser(id: number) {
    this.apiService.deleteUser(id)
    .subscribe(
      error => console.log(error));
      this.reloadData()
    }
  updateUser(id: number) {
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

