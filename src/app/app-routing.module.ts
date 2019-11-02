import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserList } from './user-list/userList.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'users', component: UserList },
  { path: 'add', component: UserAddComponent },
  { path: 'update/:id', component: UserEditComponent },
  { path: 'detail/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
