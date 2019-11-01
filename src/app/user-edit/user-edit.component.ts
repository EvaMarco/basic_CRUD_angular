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
          name="id"
          (keyup)= "onKey('id', $event)"
        >
        </label>
        <label for="name">Nombre
        <input
          type="text"
          class="name__input"
          id="name"
          name="name"
          (keyup)= "onKey('name', $event)"
        >
        </label>
        <label for="birthdate">Fecha de nacimiento
        <input
          type="datetime"
          class="date__input"
          id="birthdate"
          name="birthdate"
          (keyup)= "onKey('date', $event)"
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
  public newName = '';
  public newDate = '';
  public newId = '';
  submitted = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  updateUser(user): void {
    this.submitted = false;
    console.log(user)
  }
  onKey(guilty, event: any) {

    if(guilty === 'name'){
      this.newName = event.target.value;
      console.log('soy el nuevo nombre', this.newName);
      return(this.newName);
    }
    else if(guilty === 'id'){
      this.newId = event.target.value;
      console.log('soy la nueva id', this.newId);
      return(this.newId);
    }
    else{
      this.newDate = event.target.value;
      console.log('soy la nueva fecha', this.newDate)
      return(this.newDate);
    }
  }
  save() {
    const user = {
      id: this.newId,
      name: this.newName,
      birthdate: this.newDate
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
