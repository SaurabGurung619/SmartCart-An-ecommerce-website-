import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userNameSubject.next(parsedUser.name || 'User');
      this.isLoggedInSubject.next(true);
    }
  }

  login(user: { name: string }): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userNameSubject.next(user.name || 'User');
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userNameSubject.next('');
    this.isLoggedInSubject.next(false);
  }

  getUserName(): string {
    return this.userNameSubject.value;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  
}
