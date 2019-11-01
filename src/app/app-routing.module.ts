import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {UserAddComponent} from './user-add/user-add.component';
import {UserDeleteComponent} from './user-delete/user-delete.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserEditComponent} from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'List of Users' }
  },
  {
    path: 'user-details/:id',
    component: UserDetailComponent,
    data: { title: 'User Details' }
  },
  {
    path: 'user-add',
    component: UserAddComponent,
    data: { title: 'Add user' }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: { title: 'Edit user' }
  },
  {
    path: 'user-delete/:id',
    component: UserDeleteComponent,
    data: { title: 'Delete user' }
  },
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
