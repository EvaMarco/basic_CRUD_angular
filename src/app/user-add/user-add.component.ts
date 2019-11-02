import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-add',
  template: `
    <div class="add__wrapper">
      <h3 class= "add__title">
        create user
      </h3>
      <div
        class="form__wrapper"
        [hidden]="submitted"
      >
        <form class="form" (ngSubmit)="onSubmit()">
          <label class="label" for="name">Name
            <input
              type="text"
              class="name__input"
              id="name"
              required
              [(ngModel)]="user.name"
              name="name"
              placeholder="Nombre"
              (keyup)= "onKey('name', $event)"
            >
          </label>
          <label class="label" for="name">BirthDate
            <input
              type="datetime"
              class="date__input"
              id="birthdate"
              required
              [(ngModel)]="user.birthdate"
              name="birthdate"
              placeholder="YYYY-MM-DD"
              (keyup)= "onKey('date', $event)"
              >
          </label>
          <button
            type="submit"
            class="btn submit__btn"
          >
            Submit
          </button>
          <button
            class="btn back__btn"
            (click)="goBack()"
          >
            go back
          </button>
        </form>
      </div>
      <div [hidden]="!submitted">
        <h4 class="success__title" >You submitted successfully!</h4>
        <button
          class="btn back__btn"
          (click)="goBack()"
        >
          go back
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./user-add.component.sass']
})
export class UserAddComponent implements OnInit {

  user: User = new User();
  submitted = false;

  public newName = '';
  public newDate = '';

  constructor(
    private apiService: ApiService,
    private location: Location
  ){ }

  ngOnInit() {
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

  addUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
      this.apiService.createUser(this.user)
        .subscribe(error => console.log(error));
      this.user = new User();
  }

  onSubmit() {
    if(this.newName  !== '' && this.newDate !== ''){
      this.submitted = true;
      this.save();
    }
    else{
      this.submitted = false;
      console.log('error');
    }
  }
  goBack(): void {
    this.location.back();
  }
}

