import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserClass } from '../user-classes/user-class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApi = 'http://localhost:8080/api/v1';
  private usersURL = `${this.baseApi}/users`;

  constructor(private httpClient: HttpClient) {}

  getUsersList(): Observable<UserClass[]> {
    return this.httpClient.get<UserClass[]>(this.usersURL);
  }

  createUser(userClass: UserClass): Observable<UserClass> {
    return this.httpClient.post<UserClass>(this.usersURL, userClass);
  }

  getUserById(id: number): Observable<UserClass> {
    return this.httpClient.get<UserClass>(`${this.usersURL}/${id}`);
  }

  UpdateUser(id: number, userClass: UserClass): Observable<UserClass> {
    return this.httpClient.put<UserClass>(`${this.usersURL}/${id}`, userClass);
  }

  deleteUser(id: number): Observable<UserClass> {
    return this.httpClient.delete<UserClass>(`${this.usersURL}/${id}`);
  }

  // ...................................Register............................................................
  checkEmailExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseApi}/check-email`, {
      params: { email }
    });
  }

  //--------------------------------Login........................................................
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseApi}/login`, { email, password });
  }

}
