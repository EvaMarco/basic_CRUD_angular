import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user-list/user';
import { ApiService } from './../api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  template: `
    <div class="update__wrapper">
      <h2 class="update__title">
        User Update
      </h2>
      <div
        class="form__wrapper"
        [hidden]="submitted"
      >
        <div class="id__wrapper">
          <h3 class="id__subtitle">Update user:</h3>
          <p class="id__text">{{oldId}}</p>
        </div>
        <form class="form" (ngSubmit)="onSubmit()">
          <label
            class="label name__label"
            for="name__label"
          >
            New Name:
            <input
            [(ngModel)]="oldName"
              type="text"
              class="input name__input"
              id="name"
              name="name"
              (keyup)= "onKey('name', $event)"
            >
          </label>
          <label
            class="label date__label"
            for="birthdate"
          >
            New Birthdate:
            <input
              [(ngModel)]="oldDate"
              type="datetime"
              class="input date__input"
              id="birthdate"
              name="birthdate"
              value= "oldDate"
              (keyup)= "onKey('date', $event)"
            >
          </label>
          <button
            type="submit"
            class="btn submit__btn"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="success__wrapper" [hidden]="!submitted">
        <h2 class="up-title"> Update Information </h2>
        <h3 class="up-title update__name-title">
          New Name:
        </h3>
        <p class="up-text update__name-text">
          {{newName}}
        </p>
        <h3 class="up-title update__date-title">
          New Birthdate:
        </h3>
        <p class="up-text update__date-text">
          {{newDate  | slice:0:10 }}
        </p>
        <h4 class="update__success-title">
          You update the user successfully!
        </h4>
      </div>
      <button
        class="btn go-back__btn"
        (click)="goBack()"
      >
        go back
      </button>
    </div>
  `,
  styleUrls: ['./user-edit.component.sass']
})

export class UserEditComponent implements OnInit {

  @Input() user: User;

  public newName = '';
  public newDate = '';
  public oldId = {};
  public oldName = '';
  public oldDate = '';

  submitted = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ){ }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id =+this.route.snapshot.paramMap.get('id');
    this.apiService.getUserById(id)
      .subscribe(data => {
        this.oldName = Object(data).name;
        this.oldDate = Object(data).birthdate;
        this.oldId = Object(data).id;
      });
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
    };
    if(this.newName === ''){
      if(this.newDate === ''){
        user = {
          id: this.oldId,
          name: this.oldName,
          birthdate: this.oldDate
        };
      }
      else{
        user = {
          id: this.oldId,
          name: this.oldName,
          birthdate: this.newDate
        };
      }
    }
    else if(this.newDate === ''){
      user = {
        id: this.oldId,
        name: this.newName,
        birthdate: this.oldDate
      };
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

  goBack(): void {
    this.location.back();
  }
}
