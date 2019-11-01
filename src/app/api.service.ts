import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "/api/user";

  constructor(private http: HttpClient) { }

  getUserList (): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  getUserById(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  updateUser (id, user: Object): Observable<Object> {
  return this.http.put(`${this.apiUrl}/${id}`, user);
}
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
