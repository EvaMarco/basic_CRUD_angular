import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  template: `
    <h2>{{oldUser.name | uppercase }} detail</h2>
    <div [hidden]="submitted">
      <form (ngSubmit)="onSubmit()">

        <label for="name">Nombre
        <input
        [(ngModel)]="oldUser.name"
          type="text"
          class="name__input"
          id="name"
          name="name"
          (keyup)= "onKey('name', $event)"
        >
        </label>
        <label for="birthdate">Fecha de nacimiento
        <input
          [(ngModel)]="oldUser.birthdate"
          type="datetime"
          class="date__input"
          id="birthdate"
          name="birthdate"
          value= "oldUser.birthdate"
          (keyup)= "onKey('date', $event)"
        >
        </label>
        <button type="submit" class="btn submit__btn">Submit</button>
      </form>
    </div>
    <div [hidden]="!submitted">
      <h4>You update the user successfully!</h4>
    </div>
      <div>
        <label>User ID </label> {{oldId}}
      </div>
      <button class="delete__btn" (click)='deleteUser(oldId)'>Delete</button>
  `,
  styleUrls: ['./user-edit.component.sass']
})

export class UserEditComponent implements OnInit {
  @Input() user: User;
  public oldUser = {};
  public newName = '';
  public newDate = '';
  public oldId = {};
  public oldName = '';
  public oldDate = '';
  submitted = false;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getUser()
  }
  getUser(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.apiService.getUserById(id)
      .subscribe(data => {
        this.oldUser = data;
        this.oldName = Object(data).name;
        this.oldDate = Object(data).birthdate;
        this.oldId = Object(data).id
        }
      );
  }
  onKey(guilty, event: any) {
    if(guilty === 'name'){
      this.newName = event.target.value;
      return(this.newName);
    }
    else{
      this.newDate = event.target.value;
      return(this.newDate);
    }
  }
  save() {
    let user = {
      id: this.oldId,
      name: this.oldName,
      birthdate: this.oldDate
    }
    if(this.newName === ''){
      if(this.newDate === ''){
        user = {
          id: this.oldId,
          name: this.oldName,
          birthdate: this.oldDate
        }
      }
      else{
        user = {
          id: this.oldId,
          name: this.oldName,
          birthdate: this.newDate
        }

      }
    }
    else if(this.newDate === ''){
      user = {
        id: this.oldId,
        name: this.newName,
        birthdate: this.oldDate
      }

    }

    this.apiService.updateUser(user)
      .subscribe(
        error => console.log(error)
      );
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
