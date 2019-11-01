import { Component, OnInit } from '@angular/core';
import { User } from './../main/user';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-user-edit',
  template: `
    <h3 class= "uppdate__title">Update  User</h3>
    <div [hidden]="submitted" style="width: 400px;">
      <form (ngSubmit)="onSubmit()">
              <label for="name">Nombre</label>
              <input
                type="text"
                class="name__input"
                id="name"
                [(ngModel)]="user.name"
                name="name"
              >
              <label for="birthdate">Fecha de nacimiento</label>
              <input
                type="datetime"
                class="date__input"
                id="birthdate"
                [(ngModel)]="user.birthdate"
                name="birthdate"
              >

          <button type="submit" class="btn submit__btn">Submit</button>
      </form>
    </div>
    <div [hidden]="!submitted">
      <h4>You update the user successfully!</h4>
    </div>
  `,
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  submitted = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  addUser(): void {
    this.submitted = false;
    this.user = new User();
  }
  save() {
    this.apiService.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
      this.user = new User();
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }


}
