import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { User } from '../user-list/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  template: `
    <div class="detail__wrapper">
      <h2 class="detail__title">user details</h2>
      <div class="wrapper name__wrapper">
        <h3 class="subtitle name__subtitle">user name: </h3>
        <p class="text name__text">{{userName}}</p>
      </div>
      <div class="wrapper id__wrapper">
        <h3 class="subtitle id__subtitle">user id: </h3>
        <p class="text id__text">{{userID}}</p>
      </div>
      <div class="wrapper date__wrapper">
        <h3 class="subtitle date__subtitle">user birthdate: </h3>
        <p class="text date__text">{{userDate | slice:0:10 }}</p>
      </div>
      <button
        class="btn go-back__btn"
        (click)="goBack()"
      >
        go back to list
      </button>
    </div>
  `,
  styleUrls: ['./user-detail.component.sass']
})

export class UserDetailComponent implements OnInit {

  users: Observable<User[]>;

  public userName='';
  public userDate = '';
  public userID = {};

  @Input() user: User;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser()
  }
  getUser(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.apiService.getUserById(id)
      .subscribe(data => {
        this.userName = Object(data).name;
        this.userDate = Object(data).birthdate;
        this.userID = Object(data).id
        }
      );
  }
  reloadData() {
    this.users = this.apiService.getUserList();
  }
  goBack(): void {
    this.location.back();
  }


}

