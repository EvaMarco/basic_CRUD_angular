import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-user-add',
  template: `
    <h3 class= "create__title">Create User</h3>
    <div [hidden]="submitted" style="width: 400px;">
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            [(ngModel)]="user.name"
            name="name"
            placeholder="Nombre"
          >
        </div>
        <div class="form-group">
          <label for="name">BirthDate</label>
          <input
            type="datetime"
            class="form-control"
            id="birthdate"
            required
            [(ngModel)]="user.birthdate"
            name="birthdate"
            placeholder="YYYY-MM-DDTHH:MM:SS.NNN"
            >
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
    <div [hidden]="!submitted">
        <h4>You submitted successfully!</h4>
    </div>
  `,
  styleUrls: ['./user-add.component.sass']
})
export class UserAddComponent implements OnInit {
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

