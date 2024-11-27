import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;
  
  private mockUsers: User[] = [
    { userId: 1, username: 'Johnson', password: '1234' },
    { userId: 2, username: 'user2', password: '1234' },
    { userId: 3, username: 'user3', password: '1234' },
  ];

  private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);
  private currentUserId: number | null = null;
  private currentUsername: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const newUser = {  "email": username, "password": password };
    return this.http.post(`${this.apiServerUrl}/register`, newUser);
  }

  login(username: string, password: string): Observable<boolean> {
    const loginUser = { 
      "email": username, 
      "password": password,
      "twoFactorCode": "",
      "twoFactorRecoveryCode": ""
    };
    const response = this.http.post(`${this.apiServerUrl}/login`, loginUser);
    response.subscribe((data: any) => {
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('tokenType', data.tokenType);
        localStorage.setItem('expiresIn', data.expiresIn);
        localStorage.setItem('refreshToken', data.refreshToken);
        this.currentUsername.next(username);
        this.authenticatedSubject.next(true);
      }
      
    })
    if (localStorage.getItem("token")){
      return  new Observable(observer => observer.next(true));
    }
    return new Observable(observer => observer.next(false));
  }

  logout(): void {
    this.authenticatedSubject.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('refreshToken');
  }


  isAuthenticated(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  getCurrentUsername(): Observable<string | null> {
    return this.currentUsername.asObservable();
  }
}



