import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
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
<<<<<<< HEAD
  private apiServerUrl = 'https://localhost:7296';
=======
  private apiServerUrl = environment.apiUrl;
  
  private mockUsers: User[] = [
    { userId: 1, username: 'Johnson', password: '1234' },
    { userId: 2, username: 'user2', password: '1234' },
    { userId: 3, username: 'user3', password: '1234' },
  ];
>>>>>>> f52e4111dc42e298ddaafb19725666cfb64b551d

  private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);
  private currentUserId: number | null = null;
  private currentUsername: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('username'));

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
  
    return this.http.post<any>(`${this.apiServerUrl}/login`, loginUser).pipe(
      // Use tap to handle side effects like setting localStorage
      tap(data => {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('tokenType', data.tokenType);
          localStorage.setItem('expiresIn', data.expiresIn);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('username', username);
          this.currentUsername.next(username);
          this.authenticatedSubject.next(true);
        }
      }),
      // Map response to true if successful
      map(data => !!data.accessToken),
      // Catch any errors and return false
      catchError(() => {
        return of(false);
      })
    );
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



