import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  template: `
    <h3 class= "uppdate__title">Update  User</h3>
    <div [hidden]="submitted">
      <form (ngSubmit)="onSubmit()">
        <label for="id">Id
        <input
          type="number"
          class="id__input"
          id="name"
          [(ngModel)]="user.id"
          name="id"
        >
        </label>
        <label for="name">Nombre
        <input
          type="text"
          class="name__input"
          id="name"
          [(ngModel)]="user.name"
          name="name"
        >
        </label>
        <label for="birthdate">Fecha de nacimiento
        <input
          type="datetime"
          class="date__input"
          id="birthdate"
          [(ngModel)]="user.birthdate"
          name="birthdate"
        >
        </label>
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
  @Input() user: User;
  submitted = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  updateUser(user): void {
    this.submitted = false;
    console.log(user)
  }
  save() {
    this.apiService.updateUser(this.user.id, this.user)
      .subscribe(data => console.log(data), error => console.log(error));
      this.user = new User();
  }
  onSubmit() {
    this.submitted = true;
    // this.save();
  }


}
