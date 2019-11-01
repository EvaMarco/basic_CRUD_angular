import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserList} from './main/main.component';
import {UserAddComponent} from './user-add/user-add.component';
import {UserDeleteComponent} from './user-delete/user-delete.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserEditComponent} from './user-edit/user-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'users', component: UserList },
    { path: 'add', component: UserAddComponent },
    { path: 'edit', component: UserEditComponent },
    { path: 'delete', component: UserDeleteComponent },
    { path: 'user:id', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
