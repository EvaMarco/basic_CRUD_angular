import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://hello-world.innocv.com/api/user";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUserList (): Observable<any> {
    this.messageService.add('apiService: fetched users');
    return this.http.get(`${this.apiUrl}`);
  }
  getUserById(id: number): Observable<Object> {
    this.messageService.add(`UserService: fetched user id=${id}`);
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.apiUrl}`, user);
  }
  updateUser (user: Object): Observable<Object> {
  return this.http.put(`${this.apiUrl}`, user);
  }
  deleteUser(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
